const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  dueDate:{
    type: Date,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  important: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
