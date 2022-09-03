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

# Things to add

- Create a `.env` file and add the following as `key: value` 
  - PORT: 2121 (can be any port example: 3000) 
  - DB_STRING: `your database URI` 
 ---
 
 Have fun testing and improving it! 😎

# Group Additions
We are planning to add...

1. Time estimated to complete task
  ~~- alter the schema/object stored in our collections~~
  - alter the todos.ejs to add input field for estimated time to complete task

2.  Start button to 'start' task, should log current time
  ~~- alter the schema/object stored in our collections~~
  - alter the todos.ejs to add a button
  - add a smurf which also listens for that button and adds the current to db

3.  Alter the way we mark something complete
  - alter the schema to track the time todo was marked as complete
  - alter the smurf for marking complete to also get the current time
  * optionally display the time marked complete to the user, which would mean altering the ejs

4. Compute the delta between estimated completion time vs. actual completion time
  - alter the ejs to show this
  - alter the css if we want to change the display for the user