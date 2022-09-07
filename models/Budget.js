const mongoose = require('mongoose')
const Entry = require('../models/Entry')
//schema needs to dynamically have any categories that exist within users expense entries
const expenseEntries = Entry.find({userID: req.user.id, expense: true})
//need to find a way to make an array out of the category properties
const BudgetSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  expectedIncome:{
    type: Number,
    required: true
  },
  dateCreated: {
    type: Date,
    required : true,
    default: Date.now
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