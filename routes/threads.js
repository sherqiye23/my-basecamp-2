import express from 'express';
const router = express.Router();
import Thread from '../models/Thread.js';
import Project from '../models/Project.js';

const isAuth = (req, res, next) => {
    if (req.session.isLoggedIn) return next();
    res.redirect('/login');
};

router.post('/', isAuth, async (req, res) => {
    try {
        const { title, projectId } = req.body;

        const project = await Project.findByPk(projectId);
        if (project.userId !== req.session.user.id && req.session.user.role !== 'admin') {
            return res.redirect(`/projects/${projectId}`);
        }

        await Thread.create({ title, projectId });

        res.redirect(`/projects/${projectId}`);
    } catch (err) {
        console.error(err);
        res.redirect('back');
    }
});

router.get('/:threadId/edit', isAuth, async (req, res) => {
    const thread = await Thread.findByPk(req.params.threadId);
    res.render('threads/edit', {
        pageTitle: 'Edit Thread',
        thread
    });
});

router.put('/:threadId', isAuth, async (req, res) => {
    const thread = await Thread.findByPk(req.params.threadId);
    await thread.update({ title: req.body.title });
    res.redirect(`/projects/${thread.projectId}`);
});

router.delete('/:threadId', isAuth, async (req, res) => {
    const thread = await Thread.findByPk(req.params.threadId);
    const projectId = thread.projectId;
    await thread.destroy();
    res.redirect(`/projects/${projectId}`);
});

export default router;