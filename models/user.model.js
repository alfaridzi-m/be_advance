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
    unique: true,
    validate: {
      notContains:{
        args: ' ',
        msg: 'Username tidak boleh mengandung spasi.'
      }
  }},
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull:false
  }
}, {
  timestamps: false, 
  freezeTableName: true
});

module.exports = User;