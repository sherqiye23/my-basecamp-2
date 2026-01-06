import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import path from 'path';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';

import sequelize from './config/database.js';
import User from './models/User.js';
import Project from './models/Project.js';
import Attachment from './models/Attachment.js';
import Thread from './models/Thread.js';
import Message from './models/Message.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import projectRoutes from './routes/project.js';
import attachmentRoutes from './routes/attachments.js';
import threadRoutes from './routes/threads.js';
import messageRoutes from './routes/messages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.use(cookieParser());
app.use(session({
    secret: 'very-secret-key-mybasecamp',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// routers
app.get('/', (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/projects/dashboard');
    }
    res.render('projects/login', { pageTitle: 'Login' });
});

app.use(authRoutes);
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/attachments', attachmentRoutes);
app.use('/threads', threadRoutes);
app.use('/messages', messageRoutes);

User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'userId', as: 'creator' });
Project.hasMany(Attachment, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Attachment.belongsTo(Project, { foreignKey: 'projectId' });
Project.hasMany(Thread, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Thread.belongsTo(Project, { foreignKey: 'projectId' });
Thread.hasMany(Message, { foreignKey: 'threadId', onDelete: 'CASCADE' });
Message.belongsTo(Thread, { foreignKey: 'threadId' });
User.hasMany(Attachment, { foreignKey: 'userId' });
Attachment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });


sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`The server is running at http://localhost:${PORT}...`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });