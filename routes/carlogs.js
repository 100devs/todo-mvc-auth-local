const express = require('express')
const router = express.Router()
const carlogController = require('../controllers/carlog') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, carlogController.getCarlog)

router.post('/addCarlogVehicle', carlogController.addCarlogVehicle)

router.put('/markComplete', carlogController.markComplete)

router.put('/markIncomplete', carlogController.markIncomplete)

router.delete('/deleteCarlog', carlogController.deleteCarlog)

module.exports = router