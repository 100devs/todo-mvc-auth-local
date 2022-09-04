const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const tripRoutes = require('./routes/trips')

require('dotenv').config({ path: './config/.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Method Override
app.use(methodOverride((req, res) => {
   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it to replace with another Method
      let method = req.body._method;
      delete req.body._method;
      return method;
   }
}));

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


// Route Links
app.use('/', homeRoutes)
app.use('/trips', tripRoutes)


const PORT = process.env.PORT || 5000 // run on environment variable or 5000 if not available

// Basic Logging if running in development mode
if (process.env.NODE_ENV === 'development') {
   app.use(logger('dev'));
}

app.listen(process.env.PORT, () => {
   console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}, you better catch it!`)
})    
