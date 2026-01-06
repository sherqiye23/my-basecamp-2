import User from '../models/User.js'
import Project from '../models/Project.js'

class ProjectController {
    static async dashboard(req, res) {
        try {
            const projects = await Project.findAll({
                include: [{ model: User, as: 'creator', attributes: ['username'] }],
                order: [['createdAt', 'DESC']]
            });

            const myProjects = projects.filter(
                p => p.userId === req.session.user.id
            );
            const sharedProjects = projects.filter(
                p => p.userId !== req.session.user.id
            );

            res.render('projects/dashboard', {
                pageTitle: 'Dashboard',
                myProjects,
                sharedProjects
            });
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'An error occurred while listing the projects');
            res.render('projects/dashboard', {
                pageTitle: 'Dashboard',
                myProjects: [],
                sharedProjects: []
            });
        }
    }

    static showNewForm(req, res) {
        res.render('projects/new', {
            pageTitle: 'Create a New Project'
        });
    }

    static async createProject(req, res) {
        const { title, description } = req.body;

        if (!title) {
            req.flash('error_msg', 'A project title is required');
            return res.redirect('/projects/new');
        }

        try {
            await Project.create({
                title,
                description,
                userId: req.session.user.id
            });

            req.flash(
                'success_msg',
                `Project ${title} has been successfully created!`
            );
            res.redirect('/projects/dashboard');
        } catch (err) {
            console.error(err);
            req.flash(
                'error_msg',
                'An error occurred while creating the project'
            );
            res.redirect('/projects/new');
        }
    }

    static async showProject(req, res) {
        try {
            const project = await Project.findByPk(req.params.projectId, {
                include: [{ model: User, as: 'creator', attributes: ['username'] }]
            });

            if (!project) {
                req.flash('error_msg', 'Project not found');
                return res.redirect('/projects/dashboard');
            }

            res.render('projects/show', {
                pageTitle: project.title,
                project,
                user: req.session.user
            });
        } catch (err) {
            console.error(err);
            req.flash(
                'error_msg',
                'An error occurred while loading project details'
            );
            res.redirect('/projects/dashboard');
        }
    }

    static showEditForm(req, res) {
        res.render('projects/edit', {
            pageTitle: `Edit: ${res.locals.project.title}`,
            project: res.locals.project
        });
    }

    static async updateProject(req, res) {
        const { title, description } = req.body;
        const project = res.locals.project;

        if (!title) {
            req.flash(
                'error_msg',
                'The project title cannot be left blank'
            );
            return res.redirect(`/projects/${project.id}/edit`);
        }

        try {
            await project.update({ title, description });
            req.flash(
                'success_msg',
                `The ${project.title} project has been successfully updated.`
            );
            res.redirect(`/projects/${project.id}`);
        } catch (err) {
            console.error(err);
            req.flash(
                'error_msg',
                'An error occurred while updating the project'
            );
            res.redirect(`/projects/${project.id}/edit`);
        }
    }

    static async deleteProject(req, res) {
        const project = res.locals.project;

        try {
            await project.destroy();
            req.flash(
                'success_msg',
                `The project ${project.title} has been successfully deleted`
            );
            res.redirect('/projects/dashboard');
        } catch (err) {
            console.error(err);
            req.flash(
                'error_msg',
                'An error occurred while deleting the project'
            );
            res.redirect(`/projects/${project.id}`);
        }
    }

    static async addMember(req, res) {
        try {
            const project = await Project.findByPk(req.params.projectId);
            const user = await User.findOne({
                where: { username: req.body.username }
            });

            if (!project || !user) {
                req.flash('error_msg', 'Project or user not found');
                return res.redirect(`/projects/${req.params.projectId}`);
            }

            await project.addUser(user);

            req.flash('success_msg', 'User added to project');
            res.redirect(`/projects/${project.id}`);
        } catch (err) {
            console.error(err);
            req.flash(
                'error_msg',
                'Could not add user to project'
            );
            res.redirect(`/projects/${req.params.projectId}`);
        }
    }
}

export default ProjectController