const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messages') 
const { ensureAuth } = require('../middleware/auth')

// Need params to get all or own messages
// Default will be all
router.get('/:own?', ensureAuth, messageController.getMessages)

router.post('/createMessage', messageController.createMessage)

router.put('/like', messageController.markLiked)

router.put('/dislike', messageController.markUnliked)

router.delete('/deleteMessage', messageController.deleteMessage)

router.put('/editMessage', messageController.editMessage)

module.exports = router