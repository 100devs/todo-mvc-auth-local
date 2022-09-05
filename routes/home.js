const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureGuest, homeController.getIndex) // decide if Guest or Member
router.get('/login', ensureGuest, authController.getLogin) // goes here if Guest
router.get('/dashboard', ensureAuth, homeController.dashboard) // goes here if Member
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router
