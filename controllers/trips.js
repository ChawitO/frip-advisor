const Trip = require('../models/Trip')


// INDEX ROUTE
function index(req, res) {
  Trip
    .find()
    .then(trips => res.status(200).json(trips))
    .catch(() => res.status(404).json({ message: 'Not Found' }))
}
// CREATE ROUTE
function createTrip(req, res, next) {
  Trip 
    .create(req.body)
    .then(trips => res.status(201).json(trips))
    .catch(next)
}

// DELETE ROUTE
function deleteTrip(req, res) {
  Trip
    .findByIdAndRemove(req.body)
    .then(Trip => {
      if (!Trip.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      return Trip.remove
    })
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}


module.exports = {
  index,
  createTrip,
  deleteTrip
}