# Introduction

A Simple ToDo App is built using the MVC Architecture, we have also implemented "authorization" so folx can sign up, customize & personalize the app 

---

> Be sure to add that lovely star 😀 and fork it for your own copy

---

# Objectives

- It's a beginner level app created to understand how MVC concept and logins are added

---

# Who is this for? 

- It's for beginners & intermediates with little more experience, to help understand the various aspects of building a node app with some complex features

---

# Packages/Dependencies used 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

`npm install` 

---

### Wait, did you run `npm audit fix` or `npm audit fix--force` ?
- Go to config > `database.js`
- remove `mongoose.connect()` options: 
  - `useFindAndModify: false,`
  - `useCreateIndex: true`

### Why?
`useFindAndModify` and `useCreateIndex` are no longer supported in the latest version of Mongoose. Running `npm audit fix` updates Mongoose to the latest version, and will no longer support these `mongoose.connect()` options. Alternatively, you can also downgrading Mongoose back to v5. 

Ref: [https://stackoverflow.com/questions/59560091/the-options-usefindandmodify-is-not-supported](https://stackoverflow.com/questions/59560091/the-options-usefindandmodify-is-not-supported)

---

# Things to add

- Create a `.env` file in the config folder, and add the following as `key= value` 
  - PORT= 2121 (can be any port example: 3000) 
  - DB_STRING= `your database URI` (replace `<password>` with your created password)
---
 
 # How to run app

- `npm run start`
- `node server.js`
---
 
 Have fun testing and improving it! 😎
