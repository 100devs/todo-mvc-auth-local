// Require express
const express = require("express");
const app = express();

// Require MongoDB and Connect to Database
const mongoose = require("mongoose");

// Express session middleware: cookies
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/database");

// Require Passport for security
const passport = require("passport");

// Require express-flash, an extension of connect-flash with the ability to define a flash
// message and render it without redirecting the request.
const flash = require("express-flash");

// HTTP request logger middleware for node.js
const logger = require("morgan");

// .env file support
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

// Actual database connection
connectDB();

// Use EJS as a template engine for spitting out html
app.set("view engine", "ejs");

// Tell express to use what is in the public folder
app.use(express.static('public'))
app.use(express.static('image'))
app.use(express.urlencoded({ extended: true }));

// Instance of express that can handle JSON
app.use(express.json());

// Log statements to stdout showing details of: remote ip, request method, http version, response status, user agent etc.
app.use(logger("dev"));
// Sessions object
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// The flash is a special area of the session used for storing messages.
// Messages are written to the flash and cleared after being displayed to the user.
// The flash is typically used in combination with redirects, ensuring that the message is available
// to the next page that is to be rendered.
app.use(flash());

// Routes
const mainRoutes = require("./routes/main");
app.use("/", mainRoutes);

const entryRoutes = require("./routes/entries");
app.use("/entries", entryRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
