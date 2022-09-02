const mongoose = require('mongoose')

const BankiQuestionSchema = new mongoose.Schema({
  Question: {
    type: String, 
    required: true, 
  },
  Answer: {
    type: String,
    required: true,
  },
  Completed: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('BankiQuestion', BankiQuestionSchema)