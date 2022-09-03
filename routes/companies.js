const { getRounds } = require('bcrypt')
const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const companiesController = require('../controllers/company')
const { ensureAuth } = require('../middleware/auth')

// protect all route to stop artificial requests 
router.use('/', ensureAuth)

router.get('/', companiesController.getCompanys)

router.post('/createCompany', companiesController.createCompany)

router.put('/markComplete', companiesController.markComplete)

router.put('/markIncomplete', companiesController.markIncomplete)

router.delete('/deleteCompany', companiesController.deleteCompany)

module.exports = router