module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        // If Client is Logged In
        return next()
      } else {
        // If Client not logged in
        res.redirect('/')
      }
    }
  }
  