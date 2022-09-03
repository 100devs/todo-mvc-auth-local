const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema(
  {
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
    },
    important: {
    type: Boolean,
    default: false
    }
  },
  //{ timestamps: true }
)

module.exports = mongoose.model('Todo', TodoSchema)
