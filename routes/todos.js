import express from 'express'
import todosController from '../controllers/todos.js'
import { ensureAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', ensureAuth, todosController.getTodos)

router.post('/createTodo', ensureAuth, todosController.createTodo)

router.put('/markComplete', ensureAuth, todosController.markComplete)

router.put('/markIncomplete', ensureAuth, todosController.markIncomplete)

router.delete('/deleteTodo', ensureAuth, todosController.deleteTodo)

export default router
