const mongoose = require('mongoose')

const MaintenanceSchema = new mongoose.Schema({
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
    },
    logDetails: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true
    }
  })

  module.exports = mongoose.model('Maintenance', MaintenanceSchema)