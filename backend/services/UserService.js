import userModel from '../models/userModel.js';
import pool from '../config/db.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const UserService = {

  // Création du compte 
  createUser: async (userData) => {
    const {  first_name, last_name, email, password,confirmPassword, agency_id, role } = userData;

    const existingUser = await userModel.findByEmail(email, pool);
    if (existingUser) {
      throw new Error("Email déjà utilisé");
    }

    if (password !== confirmPassword) throw new Error("Les mots de passe ne correspondent pas !");

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
      
    // Token de vérification
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Résolution du role_id depuis le rôle fourni
    const role_id = await UserService.resolveRoleId(role);
    console.log("role_id avant création :", role_id); // <--- debug

    // Création utilisateur avec agency_id
    const { userId } = await userModel.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      verificationToken,
      agency_id,
      role_id
    }, pool);

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

  resolveRoleId: async (roleName) => {
    const [rows] = await pool.query("SELECT id FROM role WHERE name = ?", [roleName]);
    return rows.length ? rows[0].id : null;
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

  updateUserPassword: async (id,hashedPassword) => {
    const query = "UPDATE users SET password = ? WHERE id = ?";
    return await pool.query(query, [hashedPassword,id])
  },

  deleteUserById: async (id) => {
    return await userModel.deleteById(id, pool);
  },

  deleteAllUsers: async () => {
    return await userModel.deleteAll(pool);
  }

}

export default UserService;
