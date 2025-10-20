import bcrypt from 'bcrypt';

const userModel = {

// Creer un utilisateur
create:async (userData,pool) => {
    const { password,confirmPassword,email,first_name,last_name,agency_id,role_id } = userData;

    //ConfirmPassword
    if(password!==confirmPassword){
        throw new Error("Les mots de passes ne correspondent pas !")
    }

    //hashage 
    const saltRounds =10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sqlUser = 
        `INSERT INTO users (first_name, last_name, email, password, is_validated, agency_id, created_at, updated_at)
        VALUES(?, ?, ?, ?, false, ?, NOW(), NOW())
        `;

    const [result] = await pool.query(sqlUser,[first_name, last_name, email, hashedPassword, agency_id,]);
    const userId = result.insertId;


if (role_id){
    const sqlRole = `INSERT INTO user_role (user_id, role_id, assigned_at)
    VALUES (?, ?, NOW())
    `;
    await pool.query(sqlRole, [userId, role_id]);
}

return userId;
},

    //fonction pour chercher un utilisateur par l'email
    findByEmail: async (email, pool) => {
       const sql = `SELECT u.*, r.name AS role_name
       FROM users u
       LEFT JOIN user_role ur ON ur.user_id = u.id
       LEFT JOIN role r ON ur.role_id = r.id
       WHERE u.email = ?
       `;
       const [rows] = await pool.query(sql, [email]);
       return rows[0] || null;
  },
    
    getAll: async(pool) => {
       const sql = `SELECT 
        u.id, u.first_name, u.last_name, u.email, u.is_validated,
        u.created_at, u.updated_at, a.name AS agency_name,
        GROUP_CONCAT(r.name) AS roles
        FROM users u
        LEFT JOIN agencies a ON a.id = u.agency_id
        LEFT JOIN user_role ur ON ur.user_id = u.id
        LEFT JOIN role r ON ur.role_id = r.id
        GROUP BY u.id
        ORDER BY u.created_at DESC
        `;
       const [rows] =await pool.query(sql);
       return rows;
},

    getById: async(id,pool) => {
        const sql = `SELECT u.*, GROUP_CONCAT(r.name) AS roles
      FROM users u
      LEFT JOIN user_role ur ON ur.user_id = u.id
      LEFT JOIN role r ON ur.role_id = r.id
      WHERE u.id = ?
      GROUP BY u.id
      `;
        const [rows] = await pool.query(sql,[id]);
        return rows[0] || null;
    },

    deleteById: async(id,pool) => {
        const sql = `DELETE FROM users WHERE id = ?`;
        const [result] = await pool.query(sql,[id]);
        return result.affectedRows;
    },

    deleteAll: async(pool) => {
        const sql = `DELETE FROM users`;
        const [result] = await pool.query(sql);
        return result.affectedRows;
    },

    updateById: async (id, userData, pool) => {
    const { first_name, last_name, email, is_validated, agency_id } = userData;

    const sql = `
      UPDATE users 
      SET first_name = ?, last_name = ?, email = ?, is_validated = ?, agency_id = ?, updated_at = NOW()
      WHERE id = ?
    `;

    const [result] = await pool.query(sql, [first_name, last_name, email, is_validated, agency_id, id,]);
    return result.affectedRows;
},

};

export default userModel;