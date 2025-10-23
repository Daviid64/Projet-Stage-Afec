import userModel from '../models/userModel.js';
import pool from '../config/db.js';
import crypto from 'crypto';

const UserService = {
  // Créer un utilisateur
  createUser: async (userData) => {
    // Générer un token de vérification unique
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Appeler le model pour créer l'utilisateur
    const userId = await userModel.create({
      ...userData,
      status: 'pending', // par défaut
      verificationToken
    }, pool);

    return { userId, verificationToken };
  },

  // Récupérer tous les utilisateurs
  getAllUsers: async () => {
    return await userModel.getAll(pool);
  },

  // Chercher un utilisateur par email
  findUserByEmail: async (email) => {
    return await userModel.findByEmail(email, pool);
  },

  // Récupérer un utilisateur par ID
  getUserById: async (id) => {
    return await userModel.getById(id, pool);
  },

  // Supprimer un utilisateur par ID
  deleteUserById: async (id) => {
    return await userModel.deleteById(id, pool);
  },

  // Supprimer tous les utilisateurs
  deleteAllUsers: async () => {
    return await userModel.deleteAll(pool);
  },

  // Mettre à jour un utilisateur par ID
  updateUserById: async (userData, id) => {
    return await userModel.updateById(userData, id, pool);
  }
};

// Vérifier le compte via token (après inscription)
export async function verifyUserByToken(token) {
  const query = 'SELECT * FROM users WHERE verificationToken = ?';
  const [rows] = await pool.query(query, [token]);
  const user = rows[0];

  if (!user) return false;

  // Mettre à jour le status et supprimer le token
  const updateQuery = `
    UPDATE users
    SET status = 'pending', verificationToken = NULL
    WHERE id = ?
  `;
  await pool.query(updateQuery, [user.id]);

  return true;
}

export default UserService;
