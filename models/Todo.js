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
  },
  completedBy: {
       type: String,
    required: false
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
