const Cache = require('../lib/cache')

const headers = {
  headers: {
    'x-rapidapi-host': 'apidojo-booking-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPID_API_KEY
  }
}

function index(req, res) {
  Cache.get('https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete', { ...req.query, ...req.params }, headers)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: 'page not found', ...err }))
}

function hotelIndex(req, res) {
  Cache.get('https://apidojo-booking-v1.p.rapidapi.com/properties/list', { ...req.query, dest_ids: req.params.id }, headers)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: 'page not found', ...err }))
}

module.exports = { index, hotelIndex }