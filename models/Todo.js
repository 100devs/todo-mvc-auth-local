const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  estimatedTimeToCompletion: {
    type: Number,
    required: true
  },
  timeMarkedStarted: {
    type: Number,
    required: false
  },
  timeMarkedComplete: {
    type: Number,
    required: false
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
