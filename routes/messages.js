import express from 'express';
const router = express.Router();
import Message from '../models/Message.js';
import Thread from '../models/Thread.js';

const isAuth = (req, res, next) => {
    if (req.session.isLoggedIn) return next();
    res.redirect('/login');
};

router.post('/', isAuth, async (req, res) => {
    const { content, threadId } = req.body;

    await Message.create({
        content,
        threadId,
        userId: req.session.user.id
    });

    const thread = await Thread.findByPk(threadId);
    res.redirect(`/projects/${thread.projectId}`);
});

router.get('/:messageId/edit', isAuth, async (req, res) => {
    const message = await Message.findByPk(req.params.messageId);

    res.render('messages/edit', {
        pageTitle: 'Edit Message',
        message
    });
});

router.put('/:messageId', isAuth, async (req, res) => {
    const message = await Message.findByPk(req.params.messageId);
    await message.update({ content: req.body.content });

    const thread = await Thread.findByPk(message.threadId);
    res.redirect(`/projects/${thread.projectId}`);
});

router.delete('/:messageId', isAuth, async (req, res) => {
    const message = await Message.findByPk(req.params.messageId);
    const thread = await Thread.findByPk(message.threadId);
    await message.destroy();
    res.redirect(`/projects/${thread.projectId}`);
});

export default router;