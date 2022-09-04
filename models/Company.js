const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Company', CompanySchema)
