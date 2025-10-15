import bcrypt from 'bcrypt';

const User = {

// Creer un utilisateur
create:async (userData,pool) => {
    const { password,confirmPassword,email,nom,prenom,role } = userData;

    //ConfirmPassword
    if(password!==confirmPassword){
        throw new Error("Les mots de passes ne correspondent pas !")
    }

    //hashage 
    const saltRounds =10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql = 
        `INSERT INTO stagiaire (nom,prenom,email,mot_de_passe,role)
        VALUES(?,?,?,?,?)
        `;

    const [result] = await pool.query(sql,[nom,prenom,email,hashedPassword,role]);
    return result.insertId;
},

    //fonction pour chercher un utilisateur par l'email
    findByEmail: async (email, pool) => {
       const sql = `SELECT * FROM stagiaire WHERE email = ?`;
       const [rows] = await pool.query(sql, [email]);
       return rows[0] || null;
  },
    
    getAll: async(pool) => {
       const sql = `SELECT * FROM stagiaire`;
       const [rows] =await pool.query(sql);
       return rows;
},

    getById: async(id,pool) => {
        const sql = `SELECT * FROM stagiaire WHERE id = ?`;
        const [rows] = await pool.query(sql,[id]);
        return rows[0] || null;
    },

    deleteById: async(id,pool) => {
        const sql = `DELETE FROM stagiaire WHERE id = ?`;
        const [result] = await pool.query(sql,[id]);
        return result.affectedRows;
    },

    deleteAll: async(pool) => {
        const sql = `DELETE FROM stagiaire`;
        const [result] = await pool.query(sql);
        return result.affectedRows;
    },

    updateById: async (id, userData, pool) => {
    const { nom, prenom, email, role } = userData;

    const sql = `
        UPDATE stagiaire 
        SET nom = ?, prenom = ?, email = ?, role = ?, date_modification = NOW()
        WHERE id = ?
    `;

    const [result] = await pool.query(sql, [nom, prenom, email, role, id]);
    return result.affectedRows;
}

}

export default User;