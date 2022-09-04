const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getWatchList)

router.post('/searchShows', todosController.searchShows)

router.post('/addToWatchList', todosController.addToWatchList)

router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteShow', todosController.deleteShow)

module.exports = router