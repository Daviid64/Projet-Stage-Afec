import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

// Inscription
router.post('/register', userController.register);

// Connexion
router.post('/login', userController.login)

// Vérification email
router.get('/verify/:token', userController.verify);

// Recherche email
router.get('/email', userController.findByEmail);

// Tous les utilisateurs
router.get('/', userController.getAll);

// Récupérer un utilisateur par ID ( Doit être après '/verify')
router.get('/:id', userController.getById);

// Suppression
router.delete('/:id', userController.deleteById);
router.delete('/', userController.deleteAll);

// Mise à jour
router.put('/:id', userController.updateById);

export default router;
