const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String, 
    required: true, 
  },
  answer: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('Question', QuestionSchema)
