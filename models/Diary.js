const mongoose = require('mongoose')

const DiarySchema = new mongoose.Schema({
  diary: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Diary', DiarySchema)
