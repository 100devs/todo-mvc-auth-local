const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  jobTitle: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: false,
  },
  endDate: {
    type: String,
    required: false,
  },
  //Boss Info
  firstNameBoss: {
    type: String,
    required: true,
  },
  lastNameBoss: {
    type: String,
    required: true,
  },
  phoneBoss: {
    type: String,
    required: true
  },
  emailBoss: {
    type: String,
    required: true
  },
  titleBoss: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Role', RoleSchema)