import jwt from "jsonwebtoken";
import db from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Accès non autorisé"
            });
        }

        const token = authHeader.split(" ")[1];
        console.log("Token reçu :", token);
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Token décodé :", decoded);

        const [rows] = await db.query(
      'SELECT id FROM users WHERE id = ? AND is_active = 1',
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Compte désactivé ou introuvable"
      });
    }

    req.user = decoded;

        next();
    } catch (err) {
        
        return res.status(401).json({
            success: false,
            message: "token invalide ou expiré"
        });
    }
};



export const authorizeRole = (...allowedRoles) => {
    const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase().trim());

    return async (req, res, next) => {
        try {
            
            if (!req.user?.id) {
                return res.status(401).json({
                    success: false,
                    message: "Accès refusé"
                });
            }

            const [rows] = await db.query(
                `SELECT r.name AS role_name
                 FROM user_role ur
                 JOIN role r ON ur.role_id = r.id
                 WHERE ur.user_id = ?`,
                [req.user.id]
            );

            const userRoles = rows.map(r => r.role_name.toLowerCase().trim());
            req.user.roles = userRoles;

            const hasAccess = userRoles.some(role =>
                normalizedAllowedRoles.includes(role)
            );

            if (!hasAccess) {
                
                return res.status(403).json({
                    success: false,
                    message: "Accès refusé"
                });
            }

            next();
        } catch (error) {
            console.error("Erreur authorizeRole:", error);
            return res.status(500).json({
                success: false,
                message: "Une erreur interne est survenue"
            });
        }
    };
};



export const verifyAdminOrCoordinator = (req, res, next) => {

    if (!req.user?.roles) {
        return res.status(403).json({
            success: false,
            message: "Accès refusé"
        });
    }

    const roles = Array.isArray(req.user.roles)
        ? req.user.roles
        : req.user.roles.split(",");

    if (!roles.includes("super_admin") && !roles.includes("coordinateur")) {
        return res.status(403).json({
            success: false,
            message: "Accès refusé"
        });
    }

    next();
};
