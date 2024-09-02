import { sequelize } from '../index.js'

import dotenv from 'dotenv'
dotenv.config()

import { Model, DataTypes } from 'sequelize'

export class Blog extends Model { }


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
