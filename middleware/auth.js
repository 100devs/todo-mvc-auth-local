module.exports = {
     ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/login')
    },
    ensureGuest: function (req, res, next) {
      if(!req.isAuthenticated()) {
        return next()
      }
      res.redirect('/todos')
    },
    ensureAdmin: function (req, res, next) {
      if (req.isAuthenticated()) {
          if(req.user.role === 0) {
            return next()
          }
          res.redirect('/todos')
      }
      res.redirect('/login')
    }
  }
