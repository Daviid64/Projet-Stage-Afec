import db from "../db.js";

export const getAllUsers =async (req,res) => {
    try {
        const [users] = await db.query(
            `SELECT u.id, u.first_name, u.last_name, u.email, u.created_at
            FROM users u `
        );
        res.json(users);
    } catch (err) {
        res.status(500).json({message: "Erreur serveur", error: err.message});
    }
};