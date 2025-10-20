
![todos-app](https://github.com/user-attachments/assets/8d6ac30c-e0dc-472d-b4dd-b1d56726dfb6)


# Introduction

This is forked from a Simple ToDo App built using the MVC Architecture, implementing "authorization" so folx can sign up, customize & personalize the app

---

# Features

- User sessions: sign up, log in, personalized greeting and unique todo list
- Todos: adding, editing, categorizing, sorting, and deleting functions
- Special "De-stress" function when there are too many things to do...
- Packages have been updated and deprecated code adjusted from the original fork

---

# Packages/Dependencies used

- bcrypt - hashing/salting/encrypting in order to not have plain text passwords stored in the database
- connect-mongo - helps with session storage in the database
- dotenv - to use environment variable files
- ejs - templating for rendering dynamic data to html
- express - node framework for easier setup
- express-flash - flash messages without request redirection (error messaging for forms)
- express-session - using cookies along with the db to keep track of logged in users
- mongodb - to connect to mongo database
- mongoose - easily set up schemas for data being sent and stored in mongodb
- morgan - logging activity in the console
- nodemon - auto restart server after changes
- passport - strategies for authentication
- passport-local - allow user to make an account with sign in data instead of a different strategy
- validator - checks validity of strings to make sure user will enter the required data

---

# Local setup

Install all the dependencies or node packages used for development via Terminal
`npm install`

Start server with nodemon
`npm start`

---

# Things to add

- Create a `.env` file and add the following as `key: value`
  - PORT: 2121 (can be any port example: 3000)
  - DB_STRING: `your database URI`
  ***
