const router = require('express').Router()

const users = require('../controllers/auth')
const trips = require('../controllers/trips')
const bookings = require('../controllers/booking')
// const secureRouter = require('../lib/secureRouter')

router.route('/trips')
  .get(trips.index)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/cities')
  .get(bookings.index)

router.route('/cities/:id/hotels')
  .get(bookings.hotelIndex)

module.exports = router