/* jshint indent: 2 */
const Sequelize = require('sequelize')
const db = require('../db')

const Cars = db.define('cars', {
    car_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    toy_number: {
      type: Sequelize.STRING,
      allowNull: true
    },
    model_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    series: {
      type: Sequelize.STRING,
      allowNull: true
    },
    car_photo: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  })

module.exports = Cars
