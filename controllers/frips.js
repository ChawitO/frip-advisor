const Frip = require('../models/Frip')
const Cache = require('../lib/cache')

const bookingHeaders = {
  headers: {
    'x-rapidapi-host': 'apidojo-booking-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPID_API_KEY
  }
}

function index(req, res) {
  Frip
    .find()
    .populate('creator')
    .then(frips => res.status(200).json(frips))
    .catch(() => res.status(404).json({ message: 'Not Found' }))
}

function show(req, res) {
  Frip
    .findById(req.params.id)
    .populate('creator')
    .then(frip => res.status(200).json(frip))
    .catch(() => res.status(404).json({ message: 'Not Found' }))
}

function create(req, res) {
  req.body.creator = req.currentUser
  Frip
    .create(req.body)
    .catch(err => res.status(422).json(err))
}

function hotelSearch(req, res) {
  const base = {
    search_id: 'none',
    offset: 0,
    order_by: 'popularity',
    travel_purpose: 'leisure',
    languagecode: 'en',
    price_filter_currencycode: 'GBP',
    search_type: 'city',
    guest_qty: 1,
    room_qty: 1
  }

  Frip
    .findById(req.params.id)
    .then(frip => {
      if (!frip) return res.status(404).json({ message: 'Frip Not Found' })
      const fripParams = {
        dest_ids: frip.destinationCityId,
        arrival_date: frip.departureDate.toISOString().split('T')[0],
        departure_date: frip.returnDate.toISOString().split('T')[0]
      }
      return Cache.get('https://apidojo-booking-v1.p.rapidapi.com/properties/list', { ...base, ...fripParams }, bookingHeaders)
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: 'page not found', ...err }))
}

function hotelAssign(req, res) {
  Frip
    .findById(req.params.id)
    .then(frip => {
      if (!frip) return res.status(404).json({ message: 'Frip Not Found' })
      frip.hotels.push(req.body)
      return frip.save()
    })
    .then(frips => res.status(201).json(frips))
    .catch(err => res.status(422).json(err))
}

module.exports = { index, show, create, hotelSearch, hotelAssign }