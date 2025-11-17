import userModel from '../models/userModel.js';
import pool from '../config/db.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const UserService = {

  createUser: async (userData) => {
    const { first_name, last_name, email, password, confirmPassword, agency_id, role } = userData;

    const existingUser = await userModel.findByEmail(email, pool);
    if (existingUser) {
      throw new Error("Impossible de créer l'utilisateur");
    }

    if (password !== confirmPassword) {
      throw new Error("Impossible de créer l'utilisateur");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const role_id = await UserService.resolveRoleId(role);

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



  findUserByEmail: async (email, includePassword = false) => {
    const user = await userModel.findByEmail(email, pool);

    if (!user) return null;

    if (!includePassword) delete user.password;

    return user;
  },



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
    const [users] = await pool.query(`
      SELECT u.*, 
             (SELECT GROUP_CONCAT(r.name) 
              FROM user_role ur 
              JOIN role r ON ur.role_id = r.id 
              WHERE ur.user_id = u.id) AS roles,
            a.name AS agency_name,
            a.region AS agency_region
      FROM users u
      LEFT JOIN agencies a ON u.agency_id = a.id
      WHERE u.id NOT IN (
          SELECT ur.user_id 
          FROM user_role ur 
          JOIN role r ON ur.role_id = r.id 
          WHERE r.name = 'super_admin'
      )
    `);
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



  updateUserPassword: async (id, hashedPassword) => {
    const query = "UPDATE users SET password = ? WHERE id = ?";
    return await pool.query(query, [hashedPassword, id]);
  },



  deleteUserById: async (id) => {
    return await userModel.deleteById(id, pool);
  },



  deleteAllUsers: async () => {
    return await userModel.deleteAll(pool);
  }
};

export default UserService;
