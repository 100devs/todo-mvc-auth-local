const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messages') 
const { ensureAuth } = require('../middleware/auth')

// Need params to get all or own messages
// Default will be all
router.get('/:own?', ensureAuth, messageController.getMessages)

router.post('/createMessage', messageController.createMessage)

router.put('/markLiked', messageController.markLiked)

router.put('/markUnliked', messageController.markUnliked)

router.delete('/deleteMessage', messageController.deleteMessage)

module.exports = router