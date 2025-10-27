import bcrypt from 'bcrypt';
import crypto from 'crypto';

const userModel = {

  // Créer un utilisateur
  create: async (userData, pool) => {
  const { password, first_name, last_name, email, role_id } = userData;

  // Vérification mot de passe côté service
  if (!password) throw new Error("Le mot de passe est obligatoire");

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Génération d'un token de vérification
  const verificationToken = crypto.randomBytes(32).toString('hex');

  // Insertion utilisateur
  const sqlUser = `
    INSERT INTO users (first_name, last_name, email, password, status, verificationToken, created_at, updated_at)
    VALUES (?, ?, ?, ?, 'pending', ?, NOW(), NOW())
  `;
  const [result] = await pool.query(sqlUser, [first_name, last_name, email, hashedPassword, verificationToken]);
  const userId = result.insertId;

  // Assigner un rôle par défaut si aucun role_id fourni
  const assignedRoleId = role_id || 1;
  if (!assignedRoleId) {
    const [rows] = await pool.query('SELECT id FROM role WHERE name = ?', ['stagiaire']);
    if (rows.length === 0) {
      throw new Error('Rôle par défaut "stagiaire" non trouvé dans la base de données');
    }
    assignedRoleId = rows[0].id;
  }

  const sqlRole = `
    INSERT INTO user_role (user_id, role_id, assigned_at)
    VALUES (?, ?, NOW())
  `;
  await pool.query(sqlRole, [userId, assignedRoleId]);

  return { userId, verificationToken };
},


  // Chercher un utilisateur par email
  findByEmail: async (email, pool) => {
    const sql = `
      SELECT u.*, GROUP_CONCAT(r.name) AS roles
      FROM users u
      LEFT JOIN user_role ur ON ur.user_id = u.id
      LEFT JOIN role r ON ur.role_id = r.id
      WHERE u.email = ?
      GROUP BY u.id
    `;
    const [rows] = await pool.query(sql, [email]);
    return rows[0] || null;
  },

  // Récupérer tous les utilisateurs
  getAll: async (pool) => {
    const sql = `
      SELECT 
        u.id, u.first_name, u.last_name, u.email, u.status,
        u.created_at, u.updated_at,
        GROUP_CONCAT(r.name) AS roles
      FROM users u
      LEFT JOIN user_role ur ON ur.user_id = u.id
      LEFT JOIN role r ON ur.role_id = r.id
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `;
    const [rows] = await pool.query(sql);
    return rows;
  },

  // Récupérer un utilisateur par ID
  getById: async (id, pool) => {
    const sql = `
      SELECT u.*, GROUP_CONCAT(r.name) AS roles
      FROM users u
      LEFT JOIN user_role ur ON ur.user_id = u.id
      LEFT JOIN role r ON ur.role_id = r.id
      WHERE u.id = ?
      GROUP BY u.id
    `;
    const [rows] = await pool.query(sql, [id]);
    return rows[0] || null;
  },

  // Supprimer un utilisateur par ID
  deleteById: async (id, pool) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows;
  },

  // Supprimer tous les utilisateurs
  deleteAll: async (pool) => {
    const sql = `DELETE FROM users`;
    const [result] = await pool.query(sql);
    return result.affectedRows;
  },

  // Mettre à jour un utilisateur par ID
  updateById: async (userData, id, pool) => {
    const { first_name, last_name, email, status } = userData;
    const sql = `
      UPDATE users 
      SET first_name = ?, last_name = ?, email = ?, status = ?, updated_at = NOW()
      WHERE id = ?
    `;
    const [result] = await pool.query(sql, [first_name, last_name, email, status, id]);
    return result.affectedRows;
  },

};

export default userModel;
