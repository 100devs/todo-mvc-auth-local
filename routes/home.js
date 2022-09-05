const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureGuest, homeController.getIndex) // if guest go to login else go to dashboard
router.get('/login', ensureGuest, authController.getLogin) // go here if Guest
router.get('/dashboard', ensureAuth, homeController.dashboard) // only go here if Authorized
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router
