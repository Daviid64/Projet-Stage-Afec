import UserService from '../services/UserService.js';
import { sendVerificationEmail } from '../utils/mailer.js';
import bcrypt from 'bcrypt';

const userController = {

  // Inscription
  register: async (req, res) => {
    try {
      const { userId, verificationToken } = await UserService.createUser(req.body);

      const verificationLink = `${process.env.BACKEND_URL}/api/users/verify/${verificationToken}`;
      await sendVerificationEmail(req.body.email, verificationLink);

      return res.status(201).json({
        success: true,
        message: "Utilisateur créé ! Vérifiez votre email",
        userId
      });

    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  // Vérification email
  verify: async (req, res) => {
    try {
      const verified = await UserService.verifyUserByToken(req.params.token);
      if (!verified) return res.status(400).json({ success: false, message: "Token invalide" });

      return res.status(200).json({ success: true, message: "Compte vérifié" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Connexion
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);

      return res.status(200).json({
        success: true,
        message: "Connexion réussie",
        user
      });

    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  // Rechercher un utilisateur par email
  findByEmail: async (req, res) => {
    try {
      const { email } = req.query;
      const user = await UserService.findUserByEmail(email);
      if (!user) return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });

      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  // Récupérer tous les utilisateurs
  getAll: async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  // Récupérer un utilisateur par ID
  getById: async (req, res) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: "Utilisateur introuvable" });

      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  // Supprimer un utilisateur par ID
  deleteById: async (req, res) => {
    try {
      const deleted = await UserService.deleteUserById(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: "Utilisateur introuvable" });

      return res.status(200).json({ success: true, message: "Utilisateur supprimé ✅" });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  // Supprimer tous les utilisateurs
  deleteAll: async (req, res) => {
    try {
      const deleted = await UserService.deleteAllUsers();
      return res.status(200).json({ success: true, deleted });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  // Mettre à jour un utilisateur par ID
  updateById: async (req, res) => {
    try {
      const updated = await UserService.updateUserById(req.body, req.params.id);
      if (!updated) return res.status(404).json({ success: false, message: "Utilisateur introuvable" });

      return res.status(200).json({ success: true, message: "Utilisateur mis à jour ✅" });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

};

export default userController;
