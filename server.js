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
const cron = require('node-cron')
const Todo = require('./models/Todo')
const mailing = require('./nodemailer')

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
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)

// Scheduler

cron.schedule('0 0 0 * * *', () => {
  Todo.find({}, function(err, todos) {

    
    if (err) throw err;
    
    
    todos.forEach(function(todo) {
      if(Math.ceil((new Date(todo.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) == 5){
        mailing.sendMail(todo.email, todo.todo)
      }
    });
  });
})
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    