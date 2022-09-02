const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Boolean,
    required: true,
  }
})

module.exports = mongoose.model('Company', CompanySchema)
