const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  expense: {
    // true for expense, false for income
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Entry', EntrySchema)