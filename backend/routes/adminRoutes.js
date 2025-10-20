import express from 'express'
import {verifyToken, authorizeRole} from '../middleware/authMiddleware.js'
import {getAllUsers} from '../controller/adminController.js'

const router = express.Router();

router.get("/users", verifyToken,authorizeRole("super_admin"), getAllUsers);

export default router