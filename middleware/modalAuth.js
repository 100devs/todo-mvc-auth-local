// This file is used for the sendfeedback.ejs

const sendfeedback = require("../controllers/sendfeedback");

module.exports = {
  modalAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      // res.redirect('/')
      res.render("sendfeedback.ejs", {
        sendfeedbackArr: [],
        error: "Please Log In to view feedback.",
      });
    }
  },
};
