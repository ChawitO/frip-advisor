const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Trip = require('../models/Trip')
const User = require('../models/User')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    db.dropDataBase()
      .then(() => {
        return User.create([
          {
            username: 'Olly',
            email: 'olly@mail',
            password: 'pass',
            passwordConfirmation: 'pass'
          },
          {
            username: 'Simon',
            email: 'simon@mail',
            password: 'pass',
            passwordConfirmation: 'pass'
          },
          {
            username: 'Chawit',
            email: 'chawit@mail',
            password: 'pass',
            passwordConfirmation: 'pass'
          }
        ])
      })
     
  }
)
