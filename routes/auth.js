import express from 'express';
import AuthController from '../controllers/AuthController.js';
const router = express.Router();

router.get('/register', AuthController.showRegister);
router.post('/register', AuthController.register);

router.get('/login', AuthController.showLogin);
router.post('/login', AuthController.login);

router.post('/logout', AuthController.logout);

export default router;