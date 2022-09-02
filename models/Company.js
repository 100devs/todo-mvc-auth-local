// Company.js
// Test
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
  roleURL: String,
  position: String,
  source: String,
  pointOfContact: {
    name: String,
    position: String,
    email: String,
  },
  application: {
    applied: Boolean,
    date: Date,
    coffeeChat: Boolean,
    coffeeChatDate: Date,
    saidThanks: Boolean,
    interviewDate: Date,
    followUp: Date,
  },
  comments: String,
  userId: {
    type: String,
    required: true,
  }
})

// Should there be a way to add multiple points of contacts to the same company? For example: 1 Document per company (Amazon) with 3 contacts (with a separate contact schema) nested within it. <-- Complicated feature

// otherwise the user will have to make new Company document for Amazon each time they find a new contact at that company <-- Easy feature MVP

module.exports = mongoose.model('Company', CompanySchema)