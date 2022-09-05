const Todo = require('./models/Todo')
const User = require('./models/User')

module.exports = {getAllUsers, createMailForAllUsers}

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
  async function createMailForAllUsers() {
    const users = await getAllUsers();
    if(!users) {
        throw "Could not find users.";
    }
    let mailObjects = []
    let queries = []
    // find all Todo items that belong to this user.
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
        const useremail = user.email;
        const emailHTML = mailFormatter(username, useremail, result);
        const emailText = mailFormatter(username, useremail, result);
        console.log({
            email: useremail,
            emailText: emailText,
            emailHTML: emailHTML
        })
        mailObjects.push({
            email: useremail,
            emailText: emailText,
            emailHTML: emailHTML
        })
      })
    })
    .catch(function(error) {
      console.log("Error mass reading...", error);
    })
    return mailObjects;
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
  