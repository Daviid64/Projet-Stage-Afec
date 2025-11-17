import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

router.get('/', userController.getAll);

router.delete('/:id', userController.deleteById);

export default router;
