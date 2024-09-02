const { sequelize } = require('../util/db');
const { Model, DataTypes } = require('sequelize');

require('dotenv').config()

class Blog extends Model { }


Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false

  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false

  },
  likes: {
    type: DataTypes.INTEGER,
    default: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

module.exports = Blog 