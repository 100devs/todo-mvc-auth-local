const Sendfeedback = require("../models/Sendfeedback");

const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

module.exports = {
  // CREATE
  createSendfeedback: async (req, res) => {
    try {
      const sendfeedbackArr = await Sendfeedback.find({});
      const uniqID = (await sendfeedbackArr.length) + 1;
      await Sendfeedback.create({
        userId: uniqID,
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      });
      console.log("Sendfeedback has been added!");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },

  // READ
  getSendfeedback: async (req, res) => {
    console.log(req);
    try {
      // const todoItems = await Sendfeedback.find({userId:req.user.id})
      const sendfeedbackArr = await Sendfeedback.find({});
      // const itemsLeft = await Sendfeedback.countDocuments({userId:req.user.id,completed: false})
      // res.render('sendfeedback.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
      res.render("sendfeedback.ejs", { sendfeedbackArr: sendfeedbackArr });
      // res.send({Test: "Hello"})
    } catch (err) {
      console.log(err);
    }
  },

  // DELETE
  deleteSendfeedback: async (req, res) => {
    console.log(req.body.userId);
    // TODO add unique IDs
    try {
      await Sendfeedback.findOneAndDelete({ userId: req.body.userId });
      console.log("Deleted Feedback");
      res.json(`Deleted It ${req.body.userId}`);
    } catch (err) {
      console.log(err);
    }
  },

  // Auth Reroutes to stay on the same page
  // Specifically the sendfeedback.ejs

  getLogin: async (req, res) => {
    if (req.user) {
      return res.redirect("/sendfeedback");
    }
    res.render("login", {
      title: "Login",
    });
  },

  postLogin: async (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password))
      validationErrors.push({ msg: "Password cannot be blank." });

    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/sendfeedback");
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash("errors", info);
        return res.redirect("/sendfeedback");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", { msg: "Success! You are logged in." });
        res.redirect(req.session.returnTo || "/sendfeedback");
      });
    })(req, res, next);
  },

  logout: async (req, res) => {
    req.logout(() => {
      console.log("User has logged out.");
    });
    req.session.destroy((err) => {
      if (err)
        console.log(
          "Error : Failed to destroy the session during logout.",
          err
        );
      req.user = null;
      res.redirect("/sendfeedback");
    });
  },

  getSignup: async (req, res) => {
    if (req.user) {
      return res.redirect("/sendfeedback");
    }
    res.render("signup", {
      title: "Create Account",
    });
  },

  postSignup: async (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      });
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" });

    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("../signup");
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    User.findOne(
      { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
      (err, existingUser) => {
        if (err) {
          return next(err);
        }
        if (existingUser) {
          req.flash("errors", {
            msg: "Account with that email address or username already exists.",
          });
          return res.redirect("../signup");
        }
        user.save((err) => {
          if (err) {
            return next(err);
          }
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            res.redirect("/sendfeedback");
          });
        });
      }
    );
  },
};
