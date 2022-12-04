const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todoName: {
    type: String,
    required: true,
  },
  backlog: {
    type: Boolean,
    required: true,
  },
  toDo: {
    type: Boolean,
    required: true,
  },
  doing: {
    type: Boolean,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
