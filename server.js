// Require
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
const LocalStrategy = require('passport-local');

const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser');
const flash = require('express-flash')
const logger = require('morgan')
const cors = require('cors')

// Config and routes
// require dotenv before database connection so environment variable is accessible in other part of the app
require('dotenv').config({path: './config/.env'})
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')
const groupRoutes = require('./routes/groups')


// Passport config
require('./config/passport')(passport)

const app = express()
require('express-async-errors');
app.use(cors())


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(logger('dev'))


const client = connectDB().then((mClient) => {
    return new Promise((resolve) =>
      app.listen(PORT , () => console.log('Server running on port ' + PORT))
      .on('error', (err) => console.log('Server running already on port ' + PORT))
    )
     resole(mClient);

 }).catch(err => console.log(err));


const User = require('./models/User');


 // CookieParser should be above session
  app.use(cookieParser());


// Sessions
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.DB_STRING,
        collection: 'sessions'
    }),
    })
  )

// Passport middleware

app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
app.use('/groups', groupRoutes)


// No controller, just a static page. N
app.use('/terms',(req,res) => res.render('terms.ejs', {title:"Terms of Service & conditions"}));

// All unknown routes will go there, no need to create a controller for this for the moment
app.get('*', function(req, res){
    res.render('404', {title: '404' });
});
