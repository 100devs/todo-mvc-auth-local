module.exports = {
    ensureAuth: function (req, res, next) {
    res.locals.loggedin = req.isAuthenticated();
      if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/login')
    }
  }
