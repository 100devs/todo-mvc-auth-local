const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: false,
  },
  company: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  expense: {
    // true for expense, false for income
    type: Boolean,
    required: false,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Entry', EntrySchema)