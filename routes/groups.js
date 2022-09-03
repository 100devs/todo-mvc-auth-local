const express = require('express')
const router = express.Router()
const groupsController = require('../controllers/groups')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, groupsController.getGroups)

router.post('/createGroup',ensureAuth, groupsController.createGroup)

router.delete('/deleteGroup',ensureAuth, groupsController.deleteGroup)

router.delete('/updateGroup',ensureAuth, groupsController.updateGroup)

module.exports = router
