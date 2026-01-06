import User from '../models/User.js';

class AuthController {
    static showRegister(req, res) {
        res.render('projects/register', { pageTitle: 'Register' });
    }

    static async register(req, res) {
        const { username, email, password, password2 } = req.body;

        if (password !== password2) {
            req.flash('error_msg', 'Passwords do not match');
            return res.redirect('/register');
        }

        try {
            const user = await User.create({
                username,
                email,
                password,
                role: 'user'
            });

            req.flash('success_msg', 'Registration successful');
            res.redirect('/login');
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'User already exists');
            res.redirect('/register');
        }
    }

    static showLogin(req, res) {
        res.render('projects/login', { pageTitle: 'Login' });
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user || !user.isValidPassword(password)) {
                req.flash('error_msg', 'Invalid email or password');
                return res.redirect('/login');
            }

            req.session.isLoggedIn = true;
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            };

            req.flash('success_msg', `Welcome, ${user.username}!`);
            res.redirect('/projects/dashboard');

        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'An error occurred while logging in');
            res.redirect('/login');
        }
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.error(err);
            }
            res.redirect('/login');
        });
    }
}

export default AuthController