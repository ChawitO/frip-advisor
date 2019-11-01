const router = require('express').Router()

const users = require('../controllers/auth')
const trips = require('../controllers/trips')
const frips = require('../controllers/frips')
const kajaks = require('../controllers/kajak')
const bookings = require('../controllers/booking')
const zomato = require('../controllers/zomato')
const secureRoute = require('../lib/secureRoute')

router.route('/trips')
  .get(trips.index)
  // .post(secureRouter, trips.create)

// router.route('/trips/:id') // Route for members
//   .delete(secureRouter, trips.delete)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/frips')
  .get(frips.index)
  .post(secureRoute, frips.create)

router.route('/frips/:id')
  .get(frips.show)

router.route('/frips/:id/hotels')
  .get(frips.hotelSearch)
  .post(frips.hotelAssign)

router.route('/locations')
  .get(kajaks.locationSearch)

router.route('/flights')
  .get(kajaks.flightIndex)

router.route('/cities')
  .get(bookings.index)

router.route('/cities/:id/hotels')
  .get(bookings.hotelIndex)

router.route('/restaurants')
  .get(zomato.searchRestaurants)

module.exports = router