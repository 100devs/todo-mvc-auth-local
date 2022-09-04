module.exports = {
    loggedIn: function (req, res, next) {
        res.locals.loggedin = req.isAuthenticated();
        next();
    }
}
