import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite'),
    logging: false
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('The database connection has been successfully established');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

connectDB();
export default sequelize;