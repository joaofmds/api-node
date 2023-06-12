const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Task = sequelize.define('postgres', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Task;
