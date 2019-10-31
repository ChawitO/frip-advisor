const mongoose = require('mongoose')

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

module.exports = mongoose.model('Frip', fripSchema)