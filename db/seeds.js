const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Frip = require('../models/Frip')
const User = require('../models/User')
const { seedUsers, generateFrip } = require('./fakerData')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => User.create([
        {
          username: 'Chawit',
          email: 'chawit@mail',
          password: 'pass',
          passwordConfirmation: 'pass'
        },
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
        ...seedUsers
      ]))
      .then(users => Frip.create(users.map(user => generateFrip(user) )))
      .then(frips => console.log(`${frips.length} Frips created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)
