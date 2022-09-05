const express = require('express')
const router = express.Router()
const tripController = require('../controllers/trip')
const { ensureAuth } = require('../middleware/auth')

router.get('/dashboard', ensureAuth, tripController.dashboard)

router.get('/createTrip', ensureAuth, tripController.createTrip)

router.post('/createPostTrip', ensureAuth, tripController.createPostTrip)

router.get('/edit/:id', ensureAuth, tripController.edit)

router.put('/:id', ensureAuth, tripController.editPut)

module.exports = router
