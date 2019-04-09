const router = require('express').Router()
const {User, Cars} = require('../db/models')
const db = require('../db')
const userCars = db.model('userCars')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cars', async (req, res, next) => {
  try {
    const cars = await Cars.findAll({include: [{model: User, where: {id: req.params.userId}}]})
    res.json(cars)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/cars', async (req, res, next) => {
  try {
    const [car] = await userCars.findOrCreate({where: {carId: req.body.car_id, userId: `${req.params.userId}`}})
    res.json(car)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/cars/:carId', async (req, res, next) => {
  try {
    await userCars.destroy({where: {carId: req.params.carId, userId: `${req.params.userId}`}})
    res.json(Number(req.params.carId))
  } catch (err) {
    next(err)
  }
})
