const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const budgetRoutes = require("./routes/budget");
const expensesRoutes = require("./routes/expenses");

require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.use(express.static("public"));
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
app.use("/budget", budgetRoutes);
app.use("/expenses", expensesRoutes);

// 404 response handler, which is not an error (https://expressjs.com/en/starter/faq.html)
app.use((req, res) => {
  res.status(404).render("404", { user: req.user });
});

// Error handler
app.use((err, req, res, _) => {
  console.log(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).render("error", { user: req.user, status, message });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
