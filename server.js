//creates app
const express = require('express')
const app = express()

//dependencies
const mongoose = require('mongoose') // db connection
const passport = require('passport') // auth
const session = require('express-session') //sessions
const MongoStore = require('connect-mongo')(session) //
const flash = require('express-flash') 
const logger = require('morgan') // logs every request
const connectDB = require('./config/database') // connectDB function

//routes
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

//allows me to use env variables
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB() // connects to DB

//middleware
app.set('view engine', 'ejs') // view engine
app.use(express.static('public')) //public folder
app.use(express.urlencoded({ extended: true })) //parses request
app.use(express.json()) //json parser
app.use(logger('dev')) // uses morgan
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

app.use(flash()) // allows for poping showing elements
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running, you better catch it! PORT: ${process.env.PORT}`)
})    