const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')
const cron = require('node-cron') // cron job scheduler. Lets you schedule actions.
const nodemailer = require('nodemailer');

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()
//test
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
 

// schedule testing
cron.schedule("*/10 * * * * *", () => {
  console.log("Saying hello from the cronjob")
})


// source: 
// https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/
// for after may 30, 2022:
// https://stackoverflow.com/questions/71477637/nodemailer-and-gmail-after-may-30-2022
// https://nodemailer.com/smtp/oauth2/
// changed cron schedule so it will send email at midnight every day.
cron.schedule("* 0 1 * * *", () => {
  sendMail();
  console.log("Mail sent.");
})

function sendMail() {
  transporter = nodemailer.createTransport({
    service: 'OUTLOOK365',
    port:587,
    secure:false,
    auth:{
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    }
  })
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  let mailDetails = {
    from: "Node Mailer Test",
    to: process.env.DESTINATION_EMAIL, // change this to be the user email later.
    subject: "Test email using Cron Job",
    text: "Node.js cron job email" + "testing for 100Devs"
  };
  transporter.sendMail(mailDetails, (err, data) => {
    if(err) {
      console.log("An Error occurred. ", err)
    } else {
      consoel.log("Email sent successfully.")
    }
  })
  
}


app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})