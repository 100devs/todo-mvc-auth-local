const express = require('express')
const router = express.Router()
const diaryController = require('../controllers/diary') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, diaryController.getDiary)

router.post('/createDiary', diaryController.createDiary)

// router.put('/updateDiary', diaryController.updateDiary)

router.delete('/deleteDiary', diaryController.deleteDiary)

module.exports = router