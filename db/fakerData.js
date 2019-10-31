const faker = require('faker')

// Making users data
const seedUsers = []
for (let i = 0; i < 20; i++) {
  const fname = faker.name.firstName()
  const lname = faker.name.lastName()
  const username = `${fname}.${lname}`.toLowerCase()
  const user = {
    username: username,
    email: `${username}@example.com`,
    password: 'pass',
    passwordConfirmation: 'pass'
  }

  seedUsers.push(user)
}

// Making frips data function
const generateFrip = (user) => {
  const cities = [
    { name: 'London', id: '-2601889', loc: { longitude: -0.127634, latitude: 51.507391 } },
    { name: 'Rome', id: '-126693', loc: { longitude: 12.482617, latitude: 41.89587 } },
    { name: 'Paris', id: '-1456928', loc: { longitude: 2.351476, latitude: 48.856682 } },
    { name: 'Munich', id: '-1829149', loc: { longitude: 11.5756, latitude: 48.137299 } },
    { name: 'Athens', id: '-814876', loc: { longitude: 23.734866, latitude: 37.975659 } },
    { name: 'Oia', id: '-824928', loc: { longitude: 25.375216, latitude: 36.462212 } },
    { name: 'New York', id: '20088325', loc: { longitude: -73.981895, latitude: 40.768074 } },
    { name: 'Kyoto', id: '-235402', loc: { longitude: 135.75, latitude: 35 } },
    { name: 'Muscat', id: '-787987', loc: { longitude: 58.54513, latitude: 23.59979 } },
    { name: 'Barcelona', id: '-372490', loc: { longitude: 2.17001, latitude: 41.3871 } },
    { name: 'Vienna', id: '-1995499', loc: { longitude: 16.372805, latitude: 48.208546 } },
    { name: 'Hong Kong', id: '-1353149', loc: { longitude: 114.158271, latitude: 22.282697 } }
  ]

  const shuffleArray = arr => arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])

  const departureDate = faker.date.future(1)
  const shuffledCities = shuffleArray(cities)
  const oCity = shuffledCities.pop()
  const dCity = shuffledCities.pop()

  const frip = {
    name: `${user.username.split('.')[0]}'s trip to ${dCity.name}`,
    departureDate: departureDate,
    returnDate: new Date(departureDate.getTime() + (Math.max(Math.random() * 20, 2) * 60 * 60 * 24 * 1000)),
    originCity: oCity.name,
    originCityId: oCity.id,
    destinationCity: dCity.name,
    destinationCityId: dCity.id,
    desCityLoc: dCity.loc,
    creator: user
  }

  return frip
}

module.exports = { seedUsers, generateFrip }