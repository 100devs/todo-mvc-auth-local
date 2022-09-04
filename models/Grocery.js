const mongoose = require('mongoose')

const Grocerieschema = new mongoose.Schema({
  grocery: {
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
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
})

module.exports = mongoose.model('Grocery', Grocerieschema)
