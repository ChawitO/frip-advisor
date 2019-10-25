const Trip = require('../models/Trip')

function index(req, res) {
  Trip
    .find()
    .then(trips => res.status(200).json(trips))
    .catch(() => res.status(404).json({ message: 'Not Found' }))
}

function createTrip(req, res, next) {
  Trip 
    .create(req.body)
    .then(trips => res.status(201).json(trips))
    .catch(next)
}

module.exports = {
  index,
  createTrip
}