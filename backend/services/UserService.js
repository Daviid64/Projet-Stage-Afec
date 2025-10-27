import userModel from '../models/userModel.js';
import pool from '../config/db.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const UserService = {

  // Créer un utilisateur
  createUser: async (userData) => {
    try {
      const { password, confirmPassword } = userData;

      if (password !== confirmPassword) throw new Error("Les mots de passe ne correspondent pas !");

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = crypto.randomBytes(32).toString('hex');

      const { userId } = await userModel.create({
        ...userData,
        password: hashedPassword,
        status: 'pending',
        verificationToken
      }, pool);

      return { userId, verificationToken };

    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Vérification par token
  verifyUserByToken: async (token) => {
    try {
      const query = 'SELECT * FROM users WHERE verificationToken = ?';
      const [rows] = await pool.query(query, [token]);
      const user = rows[0];
      if (!user) return false;

      const updateQuery = `
        UPDATE users
        SET status = 'active', verificationToken = NULL
        WHERE id = ?
      `;
      await pool.query(updateQuery, [user.id]);
      return true;

    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Login utilisateur
  login: async (email, password) => {
    const user = await userModel.findByEmail(email, pool);
    if (!user) throw new Error("Utilisateur non trouvé");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Mot de passe incorrect");

    if (user.status !== 'active') throw new Error("Compte non activé");

    delete user.password;
    return user;
  },

  // Récupérer tous les utilisateurs
  getAllUsers: async () => {
    const users = await userModel.getAll(pool);
    users.forEach(u => delete u.password);
    return users;
  },

  findUserByEmail: async (email) => {
    const user = await userModel.findByEmail(email, pool);
    if (user) delete user.password;
    return user;
  },

  getUserById: async (id) => {
    const user = await userModel.getById(id, pool);
    if (user) delete user.password;
    return user;
  },

  deleteUserById: async (id) => {
    return await userModel.deleteById(id, pool);
  },

  deleteAllUsers: async () => {
    return await userModel.deleteAll(pool);
  },

  updateUserById: async (userData, id) => {
    return await userModel.updateById(userData, id, pool);
  }

};

export default UserService;
