const mongoose = require('mongoose')

const TripSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true
  },

  tripTitle: {
    type: String,
    required: true,
  },

  option1: {
    type: String,
    required: true,
  },

  option2: {
    type: String,
    required: true,
  },

  option3: {
    type: String,
    required: true,
  },

  dateFrom: {
    type: Date,
    required: true,    
  },

  dateTo: {
    type: Date,
    required: true,    
  },

  upVotes: {
    type: Number,
    // required: true, // vote shouldn't be required
  },

  downVotes: {
    type: Number,
    // required: true, // vote shouldn't be required
  },
  tripHost: {
    type: String,
    required: true,
  },

  tripMembers: {
    type: String,
    required: true,
  },
   membersWhoVoted: {
      type: [],
   },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  },
  {collection: 'trips'})

module.exports = mongoose.model('Trip', TripSchema)
