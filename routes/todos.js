const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.post('/createTodo', todosController.createTodo)

router.put('/changeStatus', todosController.changeStatus)

router.put('/markComplete', todosController.markComplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router