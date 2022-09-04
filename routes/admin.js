const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')
const { ensureAuth, ensureGuest, ensureAdmin } = require('../middleware/auth')


//router.get('/', adminController.getIndex)
router.get('/manageGroup',ensureAdmin, adminController.getGroups)
router.get('/manageTodo',ensureAdmin, adminController.getTodos)

module.exports = router
