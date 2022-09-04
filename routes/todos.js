const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.post('/priority', todosController.changePriority)

router.post('/addTag', todosController.addTag)

router.put('/deleteTag', todosController.deleteTag)

router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo',ensureAuth, todosController.deleteTodo)

module.exports = router
