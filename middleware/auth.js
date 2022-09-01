module.exports = { // if the user is not logged in, they will be redirected to the login page.
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    }
  }
  