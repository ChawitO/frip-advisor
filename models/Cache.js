const mongoose = require('mongoose')

const cacheSchema = new mongoose.Schema({
  data: { type: String, required: true }
}, { timestamps: true })

cacheSchema.pre('validate', function(next) {
  this.data = JSON.stringify(this.data)
  next()
})

module.exports = mongoose.model('Animal', cacheSchema)