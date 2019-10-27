const Frip = require('../models/Frip')

function index(req, res) {
  Frip
    .find()
    .populate('creator')
    .then(frips => res.status(200).json(frips))
    .catch(() => res.status(404).json({ message: 'Not Found' }))
}

function create(req, res) {
  req.body.creator = req.currentUser
  Frip
    .create(req.body)
    .then(frips => res.status(201).json(frips))
    .catch(err => res.status(422).json(err))
}

module.exports = { index, create }