/* Authors:
Nataliejhong: https://github.com/nataliejhong
MichaelTheLearner: https://github.com/MichaelTheLearner
MarcHurst: https://github.com/MarcHurst
Code4Dopamine: https://github.com/Code4Dopamine
kevinp8: https://github.com/kevinp8
shaylalewis: https://github.com/shaylalewis
*/

/* Test login info:
Username: admin
Email: admin@gmail.com
Password: adminadmin
*/
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
const cardRoutes = require('./routes/cardRoutes')

require('dotenv').config({path: './config/.env'})

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

// Routes
app.use('/', mainRoutes)
app.use('/cards/todos', todoRoutes) //Goes to --> Routes/Main.js
app.use('/cards', cardRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}, you better catch it!`)
})    