const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  timesDone: {
    type: Number,
    default: 0,
  },
  reasonWhy: {
    type: String,
    // default: '',
    // required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Todo', TodoSchema);
