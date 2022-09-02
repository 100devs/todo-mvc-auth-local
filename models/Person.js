const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: Boolean,
    required: true,
  },
  Contact: {
    type: String,
    required: true
  },
  Role: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Person', PersonSchema)