const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport') // referenced in line 16
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan') 
// libraries that are external
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')
// stuff we are setting up ourselves

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)
// requiring all the crap we need to get it to run

connectDB()

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
      store: new MongoStore({ mongoUrl: process.env.DB_STRING}),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
// tells us where the routers are
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    