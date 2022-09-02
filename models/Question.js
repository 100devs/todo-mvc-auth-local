const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  Question: {
    type: String, 
    required: true, 
  },
  Answer: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  Completed: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Question', QuestionSchema)
