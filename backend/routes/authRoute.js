import express from 'express';
import UserService from '../services/UserService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import userController from '../controller/userController.js';

const router = express.Router();

// Route de Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Tentative de connexion pour :", email);

    const user = await UserService.findUserByEmail(email, true);
    if (!user) return res.status(401).json({ success: false, message: "Email ou mot de passe invalide" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Mot de passe valide ?", isPasswordValid);

    if (!isPasswordValid) return res.status(401).json({ success: false, message: "Email ou mot de passe invalide" });
    if (user.status !== 'approved' && user.status !== 'active') {
      return res.status(403).json({ success: false, message: "Compte non activé" });
    }

    const roles = user.roles ? user.roles.split(',') : [];
    const token = jwt.sign({ id: user.id, roles }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const userSafe = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      roles
    };

    return res.status(200).json({ success: true, message: "Connexion réussie", user: userSafe, token });
  } catch (error) {
    console.error("Login Error =>", error.message);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// Mot de Passe oublié
router.post("/forgotPassword", async (req, res) => {
  try {
    const {email} = req.body;
    const user = await UserService.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({success: false, message: "Utilisateur introuvable"});
    }

  const resetToken = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn:"15m"});
  const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    html: `
     <p>Bonjour,
     Vous avez demandé à réinitialisé votre mot de passe .
     Voici votre lien 
     </p>
     <a href="${resetLink}">${resetLink}</a>
    <p> Si vous n'avez pas fait cette demande, ignorez ce message. </p>
    `,
  },(err, info) => {
  if (err) console.error("Erreur envoi mail :", err);
  else console.log("Mail envoyé :", info.response);
});

  console.log("Lien de réinitialisation :", resetLink)
  return res.status(200).json({success: true, message: "Lien de réinitialisation envoyé"});
  } catch (error) {
    console.error("Erreur password", error);
    return res.status(500).json({success: false, message: "Erreur serveur"});
  }
});

// Réinitialisation du mot de passe

router.post("/reset-password", async (req, res) => {
  try {
    const {token , password} = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserService.getUserById(decoded.id);
    if (!user) {
      return res.status(404).json({success: false, message: "Utilisateur introuvable"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserService.updateUserPassword(user.id, hashedPassword);

    return res.status(200).json({success: true, message: "Mot de passe rénitialisé avec succès"});
  }catch (error) {
    console.error("Erreur reset-password : ", error);

    if (error.name === "Erreur reset-password :", error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({success: false, message:"Lien expiré, veuillé réitérer votre demande"});
    }

    return res.status(500).json({success: false, message: "Erreur serveur"});
  }
});

//Route d'inscription
router.post("/register", async (req, res) => {
  try {
    const {first_name, last_name, email, password, confirmPassword, agency_id } = req.body;

    const existingUser = await UserService.findUserByEmail(email);
    if(existingUser) {
      return res.status(400).json({success: false, message: "Email déjà utilisé"});
    }

    const {userId} = await UserService.createUser({
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      agency_id
    });

    return res.status(201).json({success: true, message: "Utilisateur créé avec succès", user: {id: userId, first_name, last_name, email, agency_id}});
  } catch (error) {
    console.error("Erreur register", error);
    return res.status(500).json({success: false, message: "Erreur serveur"});
  }
});

export default router;
