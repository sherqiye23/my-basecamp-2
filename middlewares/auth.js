import Project from '../models/Project.js';

export const isAuth = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return next();
    }
    req.flash('error_msg', 'You must log in to access this page');
    res.redirect('/login');
};

export const isProjectOwner = async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.projectId);
        if (!project) return res.redirect('/projects/dashboard');

        if (project.userId !== req.session.user.id && req.session.user.role !== 'admin') {
            req.flash('error_msg', 'Permission denied');
            return res.redirect('/projects/dashboard');
        }

        res.locals.project = project;
        next();
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'An error occurred');
        res.redirect('/projects/dashboard');
    }
};

export const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    req.flash('error_msg', 'You do not have permission to access this page');
    res.redirect('/projects/dashboard');
};
