const User = require('./user')
const Cars = require('./cars')

Cars.belongsToMany(User, {through: 'userCars', foreignKey: 'carId'})
User.belongsToMany(Cars, {through: 'userCars'})

module.exports = {
  User, Cars
}
