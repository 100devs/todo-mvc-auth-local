const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  comments: {
    type: [String],
  }
})

module.exports = mongoose.model('Message', MessageSchema)
