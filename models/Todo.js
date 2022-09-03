// https://mongoosejs.com/docs/guide.html#definition

const mongoose = require('mongoose')

/**
 * todo: name of the taks
 * completed: inform if the
 */
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
  groupId: {
    type: String,
    required: false
  },
  shared: {
    type: Boolean,
    required: true,
    default: false
  },
  completedBy: {
       type: String,
    required: false
  },
  priority: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 1
  },
  tags: {
    type: [String]
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
