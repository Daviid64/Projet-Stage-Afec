import express from 'express'
import {verifyToken, authorizeRole} from '../middleware/authMiddleware.js'
import {getAllUsers} from '../controller/adminController.js'

const router = express.Router();

router.get("/users", verifyToken,authorizeRole("super_admin"), getAllUsers);
router.post("/users", verifyToken,authorizeRole("super_admin"), createUser);
router.patch('/users/:id/validate', verifyToken,authorizeRole("super_admin"),validateUser)


export default router