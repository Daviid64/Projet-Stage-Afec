import db from "../config/db.js";

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

export const validateUser = async (req,res) => {
    try {
        const {id} = req.params;
        const {status} = req.body; //'approved' ou 'rejected'

        if(!['approved','rejected'].includes(status)) {
            return res.status(400).json({message: 'Status invalide'});
        }

        await db.query('UPDATE users SET status = ? WHERE id = ?', [status,id]);
        res.status(200).json({message: `Utilisateur ${status}`});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};