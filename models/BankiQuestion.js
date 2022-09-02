const mongoose = require('mongoose')

const BankiQuestionSchema = new mongoose.Schema({
  question: {
    type: String, 
    required: true, 
  },
  answer: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('BankiQuestion', BankiQuestionSchema)