const express = require('express')
const router = express.Router()
const budgetsController = require('../controllers/budgets') 
const entriesController = require('../controllers/entries')
const compareController = require('../controller/compare')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, budgetsController.getBudgets)

router.post('/createBudget', budgetsController.createBudget)

router.delete('/deleteBudget', budgetsController.deleteBudget)

module.exports = router