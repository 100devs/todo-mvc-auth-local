module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) { //checks to see if there was a logged in user. .isAuthenticated comes from passport.
        return next()
      } else {
        res.redirect('/')// if the user is not logged in, return user to main page.
      }
    }
  }
  