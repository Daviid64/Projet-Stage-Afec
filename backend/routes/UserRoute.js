import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

// Tous les utilisateurs
router.get('/', userController.getAll);

// Suppression
router.delete('/:id', userController.deleteById);

export default router;
