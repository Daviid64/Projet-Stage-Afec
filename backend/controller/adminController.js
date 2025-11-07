import db from "../config/db.js";

export const getAllUsers =async (req,res) => {
    try {
        const [users] = await db.query(
            `SELECT u.id, u.first_name, u.last_name, u.email, u.created_at, u.status
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
        const {status} = req.body; //'approved' ou 'rejected' et pending

        // console.log(!['approved','rejected'].includes(status)); // A rajouter 
        // console.log(status)
        
        if(!['approved','rejected'].includes(status)) {
            return res.status(400).json({message: 'Status invalide'});
        }

        const [userRows] = await db.query (
            `SELECT u.first_name, u.email, r.name as role
            FROM users u
            LEFT JOIN user_role ur ON ur.user_id = u.id
            LEFT JOIN role r ON ur.role_id = r.id
            WHERE u.id = ?
            `,
            [id]
        );
        const user = userRows[0];
        if (!user) return res.status(404).json({message: "Utilisateur introuvable"});

        await db.query('UPDATE users SET status = ? WHERE id = ?', [status,id]);
        
        res.status(200).json({message: `Utilisateur ${status}`});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};