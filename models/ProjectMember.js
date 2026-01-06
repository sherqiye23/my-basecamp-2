import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProjectMember = sequelize.define('ProjectMember', {
  role: {
    type: DataTypes.STRING,
    defaultValue: 'member'
  }
});

export default ProjectMember;