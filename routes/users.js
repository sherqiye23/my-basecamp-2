import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js';
import { isAuth, isAdmin } from '../middlewares/auth.js';

router.get('/admin', isAuth, isAdmin, UserController.showAdmin);
router.post('/:userId/role', isAuth, isAdmin, UserController.toggleRole);
router.post('/:userId/delete', isAuth, isAdmin, UserController.deleteUser);

export default router;