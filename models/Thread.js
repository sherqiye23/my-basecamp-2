import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Thread = sequelize.define('Thread', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Thread;