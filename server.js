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


const Todo = require('./models/Todo')
const User = require('./models/User')
// get all things
app.get('/getallemails', async (req, res) => {
  const allUsers = await getAllUsers();
  if(allUsers) {
    let str = ""
    // query by foreign key in mongodb?
    const x = await getTodosForAllUsers(allUsers);
    console.log(x);
    /*
    allUsers.forEach((user) => {
      const userID = user._id;
      str += `Email: ${user.email}<br> Username: ${user.userName}<br> Todos: ${userID}<br><br>`
    });
    */
    res.send(str);
  }
  else {
    res.status(503).send("An internal server error occured.")
  }
})

async function getAllUsers() {
  try {
    const allUsers = await User.find({}, {email: 1, _id: 1, userName: 1})
    return allUsers
  } catch(err) {
    console.log("An error occurred: ");
    console.log(err);
    return null;
  }
}

async function getTodosByID(userID) {
  return 'Cartouche';
}


// assume users is an array with all users in the database.
// each user looks like this: 
// {
//    email:string, userName:string,_id: string
// }
// @returns An array of objects: 
// [
//  {
//      email:string, userName:string, todoList:Array<string> 
//  }
// ]
async function getTodosForAllUsers(users) {
  let queries = []
  users.forEach(user => {
      queries.push(async() => await Todo.find({_id: user._id})
    )
  })
  mongoose.Promise.all(queries) 
  .then((results) => {
    results.forEach(result => {
      console.log(result);
    })
  })
  .catch(function(error) {
    console.log("Error mass reading...", error);
  })
}