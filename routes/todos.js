const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.post('/priority', ensureAuth, todosController.changePriority)

router.post('/addTag', ensureAuth, todosController.addTag)

router.post('/deleteTag', ensureAuth, todosController.deleteTag)

router.post('/createTodo',ensureAuth, todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo',ensureAuth, todosController.deleteTodo)

module.exports = router
