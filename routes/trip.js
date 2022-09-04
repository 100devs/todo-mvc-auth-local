//tripRouter
const express = require('express')
const router = express.Router()
const tripController = require('../controllers/trip')
const { ensureAuth } = require('../middleware/auth')


// @desc    Show Dashboard
// @route   GET /trip/dashboard
router.get('/dashboard', ensureAuth, tripController.dashboard)

// @desc    Show Trip Form
// @route   GET /trip/createTrip
router.get('/createTrip', ensureAuth, tripController.createTrip)

// @desc    Process Trip Form
// @route   POST /trip/createPostTrip
router.post('/createPostTrip', ensureAuth, tripController.createPostTrip)

// @desc    Delete Trip
// @route   DELETE /trip/:id
router.delete('/:id', ensureAuth, tripController.deleteTrip)


module.exports = router
