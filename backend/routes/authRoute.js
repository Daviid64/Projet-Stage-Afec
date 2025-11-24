import express from 'express';
import { globalLimiter, authLimiter } from "../middleware/rateLimiters.js";
import UserService from '../services/UserService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import pool from '../config/db.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', globalLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.findUserByEmail(email, true);

    if (!user) {
      console.warn(`Tentative de login avec email inconnu : ${email}`);
      return res.status(401).json({ success: false, message: "Identifiants invalides" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn(`Mot de passe incorrect pour : ${email}`);
      return res.status(401).json({ success: false, message: "Identifiants invalides" });
    }

    if (!['approved', 'active'].includes(user.status)) {
      console.warn(`Compte inactif ou non approuvé : ${email}`);
      return res.status(401).json({ success: false, message: "Identifiants invalides" });
    }

    await pool.query(
      "UPDATE users SET last_login = NOW(), last_login_tracking = NOW() WHERE id = ?",
      [user.id]
    );

    const [rows] = await pool.query(
      `SELECT u.*, 
              (SELECT GROUP_CONCAT(r.name) 
               FROM user_role ur 
               JOIN role r ON ur.role_id = r.id 
               WHERE ur.user_id = u.id) AS roles
       FROM users u
       WHERE u.id = ?`,
      [user.id]
    );

    const updatedUser = rows[0];

    const token = jwt.sign(
      { id: updatedUser.id, roles: updatedUser.roles ? updatedUser.roles.split(',') : [] },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userSafe = {
      id: updatedUser.id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      roles: updatedUser.roles ? updatedUser.roles.split(',') : [],
      last_login: updatedUser.last_login
    };

    return res.status(200).json({ success: true, message: "Connexion réussie", user: userSafe, token });

  } catch (error) {
    console.error("Login Error =>", error);
    return res.status(500).json({ success: false, message: "Une erreur est survenue" });
  }
});



router.post("/forgotPassword", globalLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserService.findUserByEmail(email);

    if (!user) {
      console.warn(`Tentative de reset password avec email inconnu : ${email}`);
      return res.status(200).json({
        success: true,
        message: "Si un compte existe pour cet email, un message a été envoyé."
      });
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `${process.env.FRONTEND_URL_PROD}/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `<p>Bonjour,</p>
             <p>Vous avez demandé à réinitialiser votre mot de passe. Voici votre lien :</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>Si vous n'avez pas fait cette demande, ignorez ce message.</p>`
    });

    console.log("Lien de réinitialisation envoyé :", resetLink);

    return res.status(200).json({
      success: true,
      message: "Si un compte existe pour cet email, un message a été envoyé."
    });

  } catch (error) {
    console.error("Erreur forgotPassword", error);
    return res.status(500).json({ success: false, message: "Une erreur est survenue" });
  }
});



router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserService.getUserById(decoded.id);
    if (!user) {
      console.warn("Token reset associé à un utilisateur inexistant");
      return res.status(400).json({ success: false, message: "Lien invalide" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserService.updateUserPassword(user.id, hashedPassword);

    return res.status(200).json({ success: true, message: "Mot de passe réinitialisé" });

  } catch (error) {
    console.error("Erreur reset-password:", error);

    return res.status(400).json({ success: false, message: "Lien invalide" });
  }
});



router.post("/register", globalLimiter, async (req, res) => {
  try {
    const { first_name, last_name, email, password, confirmPassword, agency_id, role } = req.body;

    if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Les mots de passe ne correspondent pas" });
    if (!agency_id) return res.status(400).json({ success: false, message: "L'agence est obligatoire" });
    if (!role) return res.status(400).json({ success: false, message: "Le rôle est obligatoire" });

    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Impossible de créer ce compte" });
    }

    const { userId } = await UserService.createUser({
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      agency_id,
      role
    });

    return res.status(201).json({
      success: true,
      message: "Votre compte a été créé avec succès",
      userId
    });

  } catch (error) {
    console.error("Erreur register", error);
    return res.status(500).json({ success: false, message: "Une erreur est survenue" });
  }
});



router.post('/logout', verifyToken, authLimiter, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: "Action non autorisée" });

    const [rows] = await pool.query(
      "SELECT last_login_tracking FROM users WHERE id = ?",
      [userId]
    );

    if (!rows || !rows[0].last_login_tracking) {
      console.warn(`Tentative de logout sans session active (userId=${userId})`);
      return res.status(400).json({ success: false, message: "Erreur lors de la déconnexion" });
    }

    const loginTime = new Date(rows[0].last_login_tracking);
    const logoutTime = new Date();
    const durationSeconds = Math.floor((logoutTime - loginTime) / 1000);

    await pool.query(
      "UPDATE users SET total_connection_time = total_connection_time + ?, last_login_tracking = NULL WHERE id = ?",
      [durationSeconds, userId]
    );

    return res.status(200).json({
      success: true,
      message: "Déconnexion réussie",
      duration: durationSeconds
    });

  } catch (error) {
    console.error("Erreur logout:", error);
    return res.status(500).json({ success: false, message: "Une erreur est survenue" });
  }
});

export default router;
