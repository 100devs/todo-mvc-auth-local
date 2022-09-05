const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const gearRoutes = require("./routes/gear");
const dashboardRoutes = require("./routes/dashboard");
const path = require("path");
const browserSync = require("browser-sync");

require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
// Sessions
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

app.use(flash());

app.use("/", mainRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/gear", gearRoutes);

app.listen(process.env.PORT, () => {
  console.log(`
    o
    |    o
    |   /
    |  / 
  .-| /.
   (|/ )
.==================.
| .--------------. |
| |--.__.--.__.--| |
| |--.__.--.__.--| |
| |--.__.--.__.--| |
| |--.__.--.__.--| |
| |--.__.--.__.--| |
| '--------------'o|
| O O  """""""    o|
'=================='
Turning on the tv to port ${process.env.PORT}...`);
});
