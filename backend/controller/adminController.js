import db from "../config/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      `SELECT 
        u.id, 
        u.first_name, 
        u.last_name, 
        u.email, 
        u.status,
        u.created_at,
        u.last_login,
        COALESCE(GROUP_CONCAT(DISTINCT r.name SEPARATOR ', '), '') AS role_name 
      FROM users u
      LEFT JOIN user_role ur ON ur.user_id = u.id
      LEFT JOIN role r ON ur.role_id = r.id
      GROUP BY 
        u.id, 
        u.first_name, 
        u.last_name, 
        u.email, 
        u.status, 
        u.created_at, 
        u.last_login
      ORDER BY u.created_at DESC`
    );

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur interne" });
  }
};



export const validateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Requête invalide" });
    }

    const [userRows] = await db.query(
      `SELECT u.first_name, u.email, r.name as role
       FROM users u
       LEFT JOIN user_role ur ON ur.user_id = u.id
       LEFT JOIN role r ON ur.role_id = r.id
       WHERE u.id = ?`,
      [id]
    );

    const user = userRows[0];
    if (!user) {
      return res.status(404).json({ message: "Aucun résultat" });
    }

    await db.query(`UPDATE users SET status = ? WHERE id = ?`, [status, id]);

    res.status(200).json({ message: "Mise à jour effectuée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne" });
  }
};



export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [userRows] = await db.query(
      `SELECT 
          u.id, 
          u.first_name, 
          u.email, 
          COALESCE(GROUP_CONCAT(DISTINCT r.name SEPARATOR ', '), '') AS role_name
       FROM users u
       LEFT JOIN user_role ur ON ur.user_id = u.id
       LEFT JOIN role r ON ur.role_id = r.id
       WHERE u.id = ?`,
      [id]
    );

    const user = userRows[0];
    if (!user) {
      return res.status(404).json({ message: "Aucun résultat" });
    }

    await db.query(`DELETE FROM users WHERE id = ?`, [id]);

    res.status(200).json({ message: "Suppression effectuée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur interne" });
  }
};
