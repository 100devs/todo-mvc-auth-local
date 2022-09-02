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
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Todo', TodoSchema) // if you don't specifiy a third name, it will be pluralized automatically. (todos) will become the collection name.
