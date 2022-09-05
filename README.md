# 🙅‍♀️Introduction🙅‍♂️

The ❌TODON'T LIST❌ is a play on the normal Todo List intended to help the user be mindful of poor habits. It is built using MVC architecture and the passport-local authentication strategy inherited from the 100Devs Todo List.

---

# Objectives

Working from a provided template, our goal was to conceptualize, extend, and execute new functionality within an existing codebase.

---

# What does it do?

The Todon't List was made as a tongue-in-cheek way for folx to be mindful of poor habits by enumerating each habit, supplying a reason why it should be broken, a Shame😢 counter for how many times the behavior was performed, and a delete button for when the user deems the poor habit "broken".

The table is able to sorted by the todon't title and the times done.

There is no decrement on the shame counter -- once it's been done, you can't take it back. Violate a poor habit too many times, and you may get _gently warned_ by the app.

---

# Packages/Dependencies used

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator, list.js

---

# Installation

`npm install`

- Create a `.env` file and add the following as `key: value`
  - PORT: 2121 (can be any port example: 3000)
  - DB_STRING: `your database URI`

---

# Optimizations

Future additions may include:

- Tracking progress of each user's habit violations-per-day (which can then be visualized by a chart),
- Implementing the Google authentication strategy,
- A diary feature for the user to keep track of their moods and feelings as they try to break these habits.

---

**Thanks for checking out our app!**

Andy Yu [(andy-git985)](https://github.com/Andy-git985)

Eboni E. [(ebonidev)](https://github.com/ebonidev)

Irina Petrova [(Hopeah)](https://github.com/Hopeah)

Maribel Gallegos [(ggmaribel)](https://github.com/ggmaribel)

Steven Moses Ilagan [(moses-codes)](https://github.com/moses-codes)
