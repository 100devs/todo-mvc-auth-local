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
  userId: {
    type: String,
    required: true,
  },
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    required: true
  }
})

const DeckSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: String,
    required: true
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId
  }]
})

const Card = mongoose.model('Card', CardSchema)
const Deck = mongoose.model('Deck', DeckSchema)

module.exports = { Card, Deck }