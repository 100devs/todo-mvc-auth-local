const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required : true,
    default: Date.now
  },
  expense: {
  // true for expense, false for income
  type: Boolean,
  required: false,
  },
  amount: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  }, 
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Entry', EntrySchema)