const mongoose = require('mongoose')


//Source ?	

 
// Interview date Follow up	Comments / Notes

const HitListSchema = new mongoose.Schema({
  name: {//Company  Name
    type: String,
    required: true,
  },
  url: {// url link to application
    type: String,
    required: true,
  },
  position: {//Position 
    type: String,
    required: true,
  },
  company: {// Company
    type: String,
    required: true,
  },
  email: { // Email
    type: String,
    required: true,
  },
  typeOfPosition: {//Type Of Position
    type: String,
    required: true,
  },
  createdAt: {//Date Added
    type: Date,
    default: Date.now 
  },
  thankYou: {//Did you say thank you?
    type: Boolean,
    required: true 
  },
  applied: { //Did you apply?
    type: Boolean,
    required: true
  },
  interviewDate:{//Date of Interview
    type: String,
    required: true,
  },
  followUp: { 
    type: String, 
    required: true,
  },
  comments:{ //Comments and notes
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  dateOfCoffeeChat: { //Date coffee chat
    type: String,
    required: true
  },
  coffeeChat: { //Coffee chat
    type: String,
    required: true
  },
  dateAppSent: { //Date application sent
    type: String,
    required: true
  },
  


  
})

module.exports = mongoose.model('HitList', HitListSchema)
