import jwt from "jsonwebtoken";
import db from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET; // retirer la valeur par défaut en prod

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
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
    const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase().trim());
    return async (req, res, next) => {
        try {
            const userId = req.user.id;
            const [rows] = await db.query(
                `SELECT r.name AS role_name
                 FROM user_role ur
                 JOIN role r ON ur.role_id = r.id
                 WHERE ur.user_id = ?`,
                [userId]
            );

            const userRoles = rows.map(r => r.role_name.toLowerCase().trim());

            const hasAccess = userRoles.some(role => normalizedAllowedRoles.includes(role));
            if (!hasAccess) {
                return res.status(403).json({ message: "Accès refusé : rôle non autorisé" });
            }

            req.user.roles = userRoles;
            next();
        } catch (error) {
            console.error("Erreur dans authorizeRole:", error);
            res.status(500).json({ message: "Erreur serveur pendant la vérification du rôle" });
        }
    };
};


export const verifyAdminOrCoordinator = (req, res, next) => {
  const user = req.user; // doit être rempli par verifyToken
  if (!user || !user.roles) return res.status(403).json({ message: "Accès refusé" });

  const roles = Array.isArray(user.roles) ? user.roles : user.roles.split(",");
  if (!roles.includes("super_admin") && !roles.includes("coordinateur")) {
    return res.status(403).json({ message: "Accès refusé" });
  }

  next();
};

