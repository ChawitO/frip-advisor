const mongoose = require('mongoose')

const fripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  originCity: { type: String, required: true },
  originCityId: { type: String, required: true },
  destinationCity: { type: String, required: true },
  destinationCityId: { type: String, required: true },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  travellers: { type: [mongoose.Schema.ObjectId], ref: 'User', required: false }
}, { timestamps: true })

module.exports = mongoose.model('Frip', fripSchema)