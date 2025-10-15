import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

router.post('/register',userController.register);

router.get('/email',userController.findByEmail);
router.get('/:id',userController.getById);
router.get('/',userController.getAll);
router.get('/verify/:token',userController.verify);

router.delete('/:id',userController.deleteById);
router.delete('/',userController.deleteAll);

router.put('/:id',userController.updatedById);

export default router;