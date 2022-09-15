const mongoose = require('mongoose')// Talks to the database.

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
  dueDate: {
    type: String,
    required: true
  }
})// this model is used to talk to the database

module.exports = mongoose.model('Todo', TodoSchema)//used in the todos controller.
