const express = require('express') //adds express 
const app = express() //attaches express to app variable
const mongoose = require('mongoose') //adds mongoose for MongoStore
const passport = require('passport') //adds passport for login
const session = require('express-session') //
const MongoStore = require('connect-mongo')(session) //stores mongodb sessions
const flash = require('express-flash') //flashes error message
const logger = require('morgan')
const connectDB = require('./config/database') //adds database in config folder and attaches it to connectDB database
const mainRoutes = require('./routes/main')
// const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/config.env'}) //adds dotenv

// Passport config
require('./config/passport')(passport)

//database
connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))


// store login Sessions
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

//routes
app.use('/', mainRoutes)
// app.use('/todos', todoRoutes)
 
//listen on port
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    