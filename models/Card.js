const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
    cardName: {
        type: String,
        required: [true,'You need to give a name to your new card']
    },
  userId: {
    type: String,
    required: [true, 'no User ID provided']
  },
  todos: [{
    todo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo',
    }
  }]
})

module.exports = mongoose.model('Card', CardSchema)
