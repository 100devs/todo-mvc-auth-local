const express = require('express')
const router = express.Router()
const maintenanceController = require('../controllers/maintenance') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, maintenanceController.getHistory)

router.post('/addMaintenance', maintenanceController.addMaintenance)

// router.put('/markComplete', maintenanceController.markComplete)

// router.put('/markIncomplete', maintenanceController.markIncomplete)

router.delete('/deleteMaintenance', maintenanceController.deleteMaintenance)

module.exports = router