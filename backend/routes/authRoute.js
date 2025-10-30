import express from 'express';
import UserService from '../services/UserService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Tentative de connexion pour :", email);

    const user = await UserService.findUserByEmail(email, true);
    if (!user) return res.status(401).json({ success: false, message: "Email ou mot de passe invalide" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Mot de passe valide ?", isPasswordValid);

    if (!isPasswordValid) return res.status(401).json({ success: false, message: "Email ou mot de passe invalide" });
    if (user.status !== 'active') return res.status(403).json({ success: false, message: "Compte non activé" });

    const roles = user.roles ? user.roles.split(',') : [];
    const token = jwt.sign({ id: user.id, roles }, process.env.JWT_SECRET, { expiresIn: '1h' });

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

export default router;
