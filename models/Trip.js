const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  city: { type: String, required: true, unique: true },
  hotel: { type: String, required: true, unique: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Trip', tripSchema)