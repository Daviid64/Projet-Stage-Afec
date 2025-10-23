import express from 'express';
import UserService from '../services/UserService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Vérification du mot de passe
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Mot de passe incorrect" });

    // Génération du token JWT
    const token = jwt.sign(
      { id: user.id, role: 'super_admin' }, // ou récupérer le rôle depuis user_role
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
