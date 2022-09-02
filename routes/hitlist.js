const express = require('express')
const router = express.Router()
const hitlistController = require('../controllers/hitlist') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, hitlistController.getHitlist)

router.get('/details/:userId', hitlistController.details)

router.post('/createHitList', hitlistController.createHitlist)

router.put('/markComplete', hitlistController.markApplied)

router.put('/markIncomplete', hitlistController.markNoApplied)

router.delete('/deleteHitlist', hitlistController.deleteHitlist)

module.exports = router