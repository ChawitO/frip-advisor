const User = require('../models/User') 
const { secret }  = require('../config/environment') 
const jwt = require('jsonwebtoken') 

function secureRoute(req, res, next) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('')) { 
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = req.headers.authorization.replace('') 
  jwt.verify(token, secret, (err, payload) => { 
    if (err) return res.status(401).json({ message: 'Unauthorized' })
    User
      .findById(payload.sub) 
      .then(user => {
        if (!user) return res.status(401).json({ message: 'Unauthorized' }) 
        next() 
      })
      .catch(() => res.status(401).json({ message: 'Unauthorized' })) 
  })

}

module.exports = secureRoute