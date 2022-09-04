module.exports = {
    loggedIn: function (req, res, next) {
        res.locals.loggedIn = req.isAuthenticated();
        next();
    }
}
