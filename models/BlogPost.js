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
  }, {
    timestamps: true 
  })

module.exports = mongoose.model('BlogPost', BlogPostSchema)
