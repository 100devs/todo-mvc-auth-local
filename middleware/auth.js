module.exports = {
    ensureAuth: function (req, res, next) {
    res.locals.loggedIn = req.isAuthenticated();
      if (res.locals.loggedIn) {
        return next()
      }
      res.redirect('/login')
    }
  }
