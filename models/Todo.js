const mongoose = require('mongoose')

const WatchListSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', WatchListSchema)
