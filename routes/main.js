import express from 'express'
import { rateLimit } from 'express-rate-limit'
import * as authController from '../controllers/auth.js'
import { getIndex } from '../controllers/home.js'
import { ensureGuest } from '../middleware/auth.js'

const router = express.Router()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: 'Too many attempts. Please wait 15 minutes and try again.'
})

router.get('/', getIndex)
router.get('/login', ensureGuest, authController.getLogin)
router.post('/login', ensureGuest, authLimiter, authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', ensureGuest, authController.getSignup)
router.post('/signup', ensureGuest, authLimiter, authController.postSignup)

export default router
