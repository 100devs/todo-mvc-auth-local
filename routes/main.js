const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const sendfeedbackController = require('../controllers/sendfeedback')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

router.get('/sendfeedback', sendfeedbackController.getSendfeedback)
router.post('/sendfeedback', sendfeedbackController.createSendfeedback)

module.exports = router