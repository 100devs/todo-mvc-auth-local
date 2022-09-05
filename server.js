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

const {cronJob} = require('./email');

cronJob(); // start all cronjobs

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


app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})


const User = require('./models/User')
// get all things
app.get('/getallemails', async (req, res) => {
  const allEmails = await getAllEmails();
  if(allEmails) {
    res.send(allEmails);
  }
  else {
    res.status(503).send("An internal server error occured.")
  }
})

async function getAllEmails() {
  try {
    const allUsers = await User.find({}, {email: 1, _id: 1})
    return allUsers
  } catch(err) {
    console.log("An error occurred: ");
    console.log(err);
    return null;
  }
}