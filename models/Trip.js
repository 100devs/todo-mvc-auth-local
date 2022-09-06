const mongoose = require('mongoose')
test

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

vote: [],

tripMembers: {
  type: String,
  required: true,
},

createdAt: {
  type: Date,
  default: Date.now,
},

})

module.exports = mongoose.model('Trip', TripSchema)
