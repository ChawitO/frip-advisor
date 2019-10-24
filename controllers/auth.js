const User = require('../models/User')
// const jwt = require('jsonwebtoken')
// const secret = require('../config/environment')

function register(req, res) {
  User
    .create(req.body) 
    .then(user => res.status(201).json({ message: `Thanks for Registering ${user.username}` })) 
    .catch(err => res.status(422).json({ ...err, text: 'hitting error' }))
}

module.exports = {
  register
}