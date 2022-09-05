const mongoose = require('mongoose')

const BudgetSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
    dateCreated: {
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

module.exports = mongoose.model('Budget', BudgetSchema)