import express from 'express';
const router = express.Router();
import { isAuth, isProjectOwner, isAdmin } from '../middlewares/auth.js';
import ProjectController from '../controllers/projectController.js';

router.get('/dashboard', isAuth, ProjectController.dashboard);
router.get('/new', isAuth, ProjectController.showNewForm);
router.post('/', isAuth, ProjectController.createProject);

router.get('/:projectId', isAuth, ProjectController.showProject);
router.get('/:projectId/edit', isAuth, isProjectOwner, ProjectController.showEditForm);
router.put('/:projectId', isAuth, isProjectOwner, ProjectController.updateProject);
router.delete('/:projectId', isAuth, isProjectOwner, ProjectController.deleteProject);

router.post('/:projectId/members', isAuth, ProjectController.addMember);

export default router;