import userModel from '../models/userModel.js';
import pool from '../config/db.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../utils/mailer.js';

const UserService = {

  // Création du compte 
  createUser: async (userData) => {
    const { password, confirmPassword, email, agency_id } = userData;

    if (password !== confirmPassword) throw new Error("Les mots de passe ne correspondent pas !");

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Token de vérification
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Création utilisateur avec agency_id
    const { userId } = await userModel.create({
      ...userData,
      password: hashedPassword,
      verificationToken,
      agency_id
    }, pool);

    // Envoi mail
    const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    return { userId, verificationToken };
  },

  // Chercher un utilisateur par email
  findUserByEmail: async (email, includePassword = false) => {
    const user = await userModel.findByEmail(email, pool);

    // Récupérer le mot de passe uniquement si demandé
    if (user && !includePassword) delete user.password;

    return user;
  },

  // Vérification par token
  verifyUserByToken: async (token) => {
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
  },

  getAllUsers: async () => {
    const users = await userModel.getAll(pool);
    users.forEach(u => delete u.password);
    return users;
  },

  getUserById: async (id) => {
    const user = await userModel.getById(id, pool);
    if (user) delete user.password;
    return user;
  },

  updateUserById: async (userData, id) => {
    return await userModel.updateById(userData, id, pool);
  },

  deleteUserById: async (id) => {
    return await userModel.deleteById(id, pool);
  },

  deleteAllUsers: async () => {
    return await userModel.deleteAll(pool);
  }

};

export default UserService;
