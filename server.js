// if we have time search system

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
const hitlistRoutes = require('./routes/hitlist')

require('dotenv').config({ path: './config/.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
  session({
    secret: process.env.SECRET_SESSION,//this need to be secret add it to .env file
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
app.use('/hitlist', hitlistRoutes)

app.listen(process.env.PORT, () => {
  console.log('Server is running, you better catch it!')
})



