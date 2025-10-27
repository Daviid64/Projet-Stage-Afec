import express from 'express';
import UserService from '../services/UserService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.findUserByEmail(email);    // Vérifier le role si pas admin vérifier le statut si non approuvé "erreur"
    if (!user) return res.status(403).json({ message: "email ou mot de passe invalide" });

    // Vérification du mot de passe
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "email ou mot de passe incorrect" });

    // Génération du token JWT
    const token = jwt.sign(
      { id: user.id }, // ou récupérer le rôle depuis user_role
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
