const router = require('express').Router()
const {Cars} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allCars = await Cars.findAll()
    res.json(allCars)
  } catch (err) {
    next(err)
  }
})
