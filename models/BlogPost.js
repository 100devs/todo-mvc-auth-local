const mongoose = require('mongoose')

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  gitHub: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: String,
    required: false,
  },
  mood: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Private'
  }
})

module.exports = mongoose.model('BlogPost', BlogPostSchema)
