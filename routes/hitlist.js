const express = require('express')
const router = express.Router()
const hitlistController = require('../controllers/hitlist') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, hitlistController.getHitlist)

router.get('/details/:_id', ensureAuth, hitlistController.details)

router.get('/edit/:_id', ensureAuth, hitlistController.editHitlist)

router.post('/createHitList', hitlistController.createHitlist)

router.put('/markComplete', hitlistController.markApplied)

router.put('/markIncomplete', hitlistController.markNoApplied)

router.delete('/deleteHitlist', hitlistController.deleteHitlist)

module.exports = router