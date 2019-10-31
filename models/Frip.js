require('dotenv').config()
const mongoose = require('mongoose')
const Cache = require('../lib/cache')

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  url: { type: String },
  image: { type: String }
}, { timestamps: true })
 
const fripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  originCity: { type: String, required: true },
  originCityId: { type: String, required: true },
  destinationCity: { type: String, required: true },
  destinationCityId: { type: String, required: true },
  desCityLoc: { type: Object },
  weatherForecast: { type: Object },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  hotels: [hotelSchema],
  creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  travellers: { type: [mongoose.Schema.ObjectId], ref: 'User', required: false }
}, { timestamps: true })

const darkskyHeaders = {
  headers: {
    'x-rapidapi-host': 'dark-sky.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPID_API_KEY
  }
}

fripSchema.pre('save', function checkWeather(next) {
  if (!this.weatherForecast && this.desCityLoc) {
    const url = [
      this.desCityLoc.latitude,
      this.desCityLoc.longitude,
      this.departureDate.toISOString().split('.')[0]
    ]

    Cache.get(`https://dark-sky.p.rapidapi.com/${url.join(',')}`, { params: { exclude: 'currently,minutely,hourly', units: 'si' } }, darkskyHeaders)
      .then(data => this.weatherForecast = data.daily.data[0])
      .catch(err => console.log(err))
      .finally(() => next())
  } else {
    next()
  }
})

module.exports = mongoose.model('Frip', fripSchema)