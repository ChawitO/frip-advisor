const router = require('express').Router()

const users = require('../controllers/auth')
const bookings = require('../controllers/booking')

router.route('/register')
  .post(users.register)

router.route('/cities')
  .get(bookings.index)

router.route('/cities/:id/hotels')
  .get(bookings.hotelIndex)

module.exports = router