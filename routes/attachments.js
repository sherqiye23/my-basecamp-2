import express from 'express';
const router = express.Router();
import multer from 'multer';
import path from 'path';

import Attachment from '../models/Attachment.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf', 'text/plain'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({ storage, fileFilter });

// post
router.post('/', upload.single('file'), async (req, res) => {
    try {
        const { projectId } = req.body;

        await Attachment.create({
            filename: req.file.originalname,
            filepath: req.file.filename,
            filetype: req.file.mimetype,
            projectId,
            userId: req.session.user.id
        });

        req.flash('success_msg', 'File uploaded successfully');
        res.redirect(`/projects/${projectId}`);
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'File upload failed');
        res.redirect('back');
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        const attachment = await Attachment.findByPk(req.params.id);
        const projectId = attachment.projectId;

        await attachment.destroy();
        req.flash('success_msg', 'Attachment deleted');
        res.redirect(`/projects/${projectId}`);
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Delete failed');
        res.redirect('back');
    }
});

export default router;