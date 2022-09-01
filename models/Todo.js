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
  card: {
    type: String,
    required: [true,'todo has to be associated with a card']
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
