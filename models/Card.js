const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  active: {
    type: Boolean,
    required: true,
    trim: true
  },
  userId: {
    type: String,
    required: true,
  },
  deck:{
    type: String,
    required: true,
    trim: true,
  },
  //deckId:{
    //idenitfy a way to generate a specific id for each deck (if needed)
  //}
})

module.exports = mongoose.model('Card', CardSchema)