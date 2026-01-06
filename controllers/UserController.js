import User from '../models/User.js'

class UserController {
    static async showAdmin(req, res) {
        try {
            const users = await User.findAll();

            res.render('users/admin', {
                pageTitle: 'User Management',
                users
            });
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Could not load users');
            res.redirect('/');
        }
    }

    static async toggleRole(req, res) {
        try {
            const user = await User.findByPk(req.params.userId);

            if (!user) {
                req.flash('error_msg', 'User not found');
                return res.redirect('/users/admin');
            }

            user.role = user.role === 'admin' ? 'user' : 'admin';
            await user.save();

            req.flash('success_msg', `Role of ${user.username} has been updated`);
            res.redirect('/users/admin');
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Could not update user role');
            res.redirect('/users/admin');
        }
    }

    static async deleteUser(req, res) {
        try {
            const user = await User.findByPk(req.params.userId);

            if (!user) {
                req.flash('error_msg', 'User not found');
                return res.redirect('/users/admin');
            }

            await user.destroy();

            req.flash('success_msg', `User ${user.username} has been deleted`);
            res.redirect('/users/admin');
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Could not delete user');
            res.redirect('/users/admin');
        }
    }
}

export default UserController