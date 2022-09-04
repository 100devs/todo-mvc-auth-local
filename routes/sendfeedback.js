const express = require('express')
const router = express.Router()
const sendfeedbackController = require('../controllers/sendfeedback') 
// const { ensureAuth } = require('../middleware/auth')

router.get('/sendfeedback', sendfeedbackController.getSendfeedback)

router.post('/sendfeedback', sendfeedbackController.createSendfeedback)

// router.put('/markComplete', todosController.markComplete)

// router.put('/markIncomplete', todosController.markIncomplete)

// router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router