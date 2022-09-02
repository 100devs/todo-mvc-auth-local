const express = require('express')
const passport = require('passport')
const router = express.Router()


router.get('/google', passport.authenticate('google',{ scope:
    [ 'email', 'profile' ] }))
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/todos');
  })

module.exports = router
