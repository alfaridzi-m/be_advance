const { DataTypes } = require('sequelize');

const db = require('../config/db.config.js');

const User = db.define('User', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false, 
  freezeTableName: true
});

module.exports = User;