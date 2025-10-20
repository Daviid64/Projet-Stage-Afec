import jwt from "jsonwebtoken";
import db from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET; // retirer la valeur par défaut en prod

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token manquant ou invalide" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token invalide ou expiré" });
    }
};

export const authorizeRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;

            // Récupère les rôles du user depuis la base
            const [rows] = await db.query(
                `
                SELECT r.name AS role_name
                FROM user_role ur
                JOIN role r ON ur.role_id = r.id
                WHERE ur.user_id = ?
                `,
                [userId]
            );

            const userRoles = rows.map(r => r.role_name);

            // Vérifie si le user a au moins un rôle autorisé
            const hasAccess = userRoles.some(role => allowedRoles.includes(role));
            if (!hasAccess) {
                return res.status(403).json({ message: "Accès refusé : rôle non autorisé" });
            }

            // Stocke les rôles du user pour un usage ultérieur
            req.user.roles = userRoles;
            next();
        } catch (error) {
            console.error("Erreur dans le middleware authorizeRole:", error);
            res.status(500).json({ message: "Erreur serveur pendant la vérification du rôle" });
        }
    };
};
