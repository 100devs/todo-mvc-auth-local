// Company.js
// Test again
const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  url: String,
  role: String,
  roleURL: String,
  position: String,
  source: String,
  pointOfContact: {
    name: String,
    position: String,
    email: String,
  },
  application: {
    // The Boolean type accepts 'yes' and 'no' values and casts them to true and false
    applied: Boolean,
    applyDate: Date,
    coffeeChat: Boolean,
    coffeeChatDate: Date,
    saidThanks: Boolean,
    interviewDate: Date,
    followUpDate: Date,
  },
  comments: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Company', CompanySchema)
