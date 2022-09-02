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
  github: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  duedate: {
    type: Date,
    required: false,
  },
  mood: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('BlogPost', BlogPostSchema)
