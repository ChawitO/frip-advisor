const mongoose = require('mongoose')

const cacheSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  data: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Cache', cacheSchema)