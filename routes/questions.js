const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home') 
const questionsController = require('../controllers/questions') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, questionsController.getBankiQuestions)

router.post('/createQuestion', questionsController.createQuestion)

router.put('/markComplete', questionsController.markComplete)

router.put('/markIncomplete', questionsController.markIncomplete)

router.delete('/deleteQuestion', questionsController.deleteQuestion)

router.get('/editBanki', ensureAuth, questionsController.getBankiQuestionsToEdit)

module.exports = router