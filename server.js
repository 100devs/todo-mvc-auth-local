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
    // query by foreign key in mongodb?
    const str = await getTodosForAllUsers(allUsers);
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
  // 
  users.forEach(user => {
      // transform Todo.find() into a promise, then push it onto the stack.
      const fn = Todo.find({userId: user._id}).exec();

      queries.push(fn)
  })
  // in theory, order is preserved in Promise.all()
  // TODO: handle promise rejection. (aka: what happens when we can't read everyone's stuff)
  Promise.all(queries) 
  .then((results) => {
    results.forEach((result, index) => {
      const user = users[index];
      const username = user.userName;
      const email = user.email;
      console.log(mailFormatter(username, email, result));

    })
  })
  .catch(function(error) {
    console.log("Error mass reading...", error);
  })
}

function mailFormatter(username, email, todoList) {
  let introduction = `Hello, ${username}! This is your current todo list from Listify! Log in to complete!<br><br>`
  let todolistHTML = `<ul>`;
  todoList.forEach(todoItem => {
      todolistHTML += `<li>${todoItem.todo}</li>`
  })
  todolistHTML += `</ul>`;
  todolistHTML += `${email} got this letter.`
  return introduction + todolistHTML;
}

function mailFormatterPlainText(username, email, todoList) 
{
  let introduction = `Hello, ${username}! This is your current todo list from Listify! Log in to complete!\r\n\r\n`
  let todolistHTML = ``;
  todoList.forEach(todoItem => {
      todolistHTML += `\r\n${todoItem.todo}\r\n`
  })
  todolistHTML += `${email} got this letter.`
  return introduction + todolistHTML;

}

