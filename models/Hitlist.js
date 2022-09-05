const mongoose = require('mongoose')


//Source ?	

 
// Interview date Follow up / Notes

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
    required: false 
  },
  applied: { //Did you apply?
    type: Boolean,
    required: false
  },
  interviewDate:{//Date of Interview
    type: String,
    required: false,
  },
  followUp: { 
    type: String, 
    required: false,
  },
  comments:{ //Comments and notes
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false
  },
  dateOfCoffeeChat: { //Date coffee chat
    type: String,
    required: false
  },
  coffeeChat: { //Coffee chat
    type: String,
    required: false
  },
  dateAppSent: { //Date application sent
    type: String,
    required: false
  },
  



  
})

module.exports = mongoose.model('HitList', HitListSchema, 'Hitlist')
