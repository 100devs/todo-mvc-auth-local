module.exports = {
    ensureAuth: function (req, res, next) { //checks if the req/user is authenticated
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    }
  }
  