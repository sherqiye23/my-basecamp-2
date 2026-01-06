import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Attachment = sequelize.define('Attachment', {
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filepath: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filetype: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Attachment;