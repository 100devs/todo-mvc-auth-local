const mongoose = require('mongoose')

const CarLogSchema = new mongoose.Schema({
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    registrationExpiration: {
      type: Date,
      required: true
    }
  })

  module.exports = mongoose.model('Carlog', CarLogSchema)