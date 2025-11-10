import express from 'express';
import UserService from '../services/UserService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import pool from '../config/db.js';

const router = express.Router();

// -------------------- LOGIN --------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Tentative de connexion pour :", email);

    const user = await UserService.findUserByEmail(email, true);
    if (!user) return res.status(401).json({ success: false, message: "Email ou mot de passe invalide" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ success: false, message: "Email ou mot de passe invalide" });

    if (!['approved', 'active'].includes(user.status)) {
      return res.status(403).json({ success: false, message: "Compte non activé" });
    }

    // Mettre à jour last_login
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

    // Récupérer l'utilisateur avec les rôles à jour
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

    if (!rows || rows.length === 0) {
      return res.status(500).json({ success: false, message: "Utilisateur introuvable après update" });
    }

    const updatedUser = rows[0];

    // Générer le token JWT
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
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// -------------------- MOT DE PASSE OUBLIÉ --------------------
router.post("/forgotPassword", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserService.findUserByEmail(email);
    if (!user) return res.status(404).json({ success: false, message: "Utilisateur introuvable" });

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

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

    console.log("Lien de réinitialisation :", resetLink);
    return res.status(200).json({ success: true, message: "Lien de réinitialisation envoyé" });

  } catch (error) {
    console.error("Erreur password", error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// -------------------- RESET PASSWORD --------------------
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserService.getUserById(decoded.id);
    if (!user) return res.status(404).json({ success: false, message: "Utilisateur introuvable" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserService.updateUserPassword(user.id, hashedPassword);

    return res.status(200).json({ success: true, message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error("Erreur reset-password:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ success: false, message: "Lien expiré, veuillez réitérer votre demande" });
    }

    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// -------------------- INSCRIPTION --------------------
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, confirmPassword, agency_id, role } = req.body;

    if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Les mots de passe ne correspondent pas" });
    if (!agency_id) return res.status(400).json({ success: false, message: "L'agence est obligatoire" });
    if (!role) return res.status(400).json({ success: false, message: "Le rôle est obligatoire" });

    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ success: false, message: "Email déjà utilisé" });

    const { userId } = await UserService.createUser({ first_name, last_name, email, password, confirmPassword, agency_id, role });

    return res.status(201).json({
      success: true,
      message: role === "coordinateur"
        ? "Compte coordinateur créé. En attente de validation par l'admin principal"
        : "Compte stagiaire créé avec succès !",
      userId
    });
  } catch (error) {
    console.error("Erreur register", error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

export default router;
