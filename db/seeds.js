const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Trip = require('../models/Trip')
const User = require('../models/User')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
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
      .then(users => {
        return Trip.create([
          {
            user: users[0],
            city: 'London',
            hotel: 'Shangri-la',
            departureDate: '23/04/2020',
            arrivalDate: '29/04/2020',
            numberPeople: 1
          },
          {
            user: users[1],
            city: 'Brussels',
            hotel: 'Hilton',
            departureDate: '01/01/2020',
            arrivalDate: '10/01/2020',
            numberPeople: 2
          },
          {
            user: users[2],
            city: 'Bangkok',
            hotel: 'Mandarin',
            departureDate: '18/02/2020',
            arrivalDate: '23/02/2020',
            numberPeople: 3
          }
        ])
      })
      .then(trips => console.log(`${'trip'.repeat(trips.length)} created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)
