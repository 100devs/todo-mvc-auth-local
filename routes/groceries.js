const express = require('express')
const router = express.Router()
const groceriesController = require('../controllers/groceries') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, groceriesController.getGroceries)

router.post('/createGrocery', groceriesController.createGrocery)

router.put('/markComplete', groceriesController.markComplete)

router.put('/markIncomplete', groceriesController.markIncomplete)

router.delete('/deleteGrocery', groceriesController.deleteGrocery)

module.exports = router