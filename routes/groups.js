const express = require('express')
const router = express.Router()
const groupsController = require('../controllers/groups')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, groupsController.getGroups)

router.post('/createGroup',ensureAuth, groupsController.addGroup)

router.get('/createGroup',ensureAuth, groupsController.createGroup)

router.post('/updateGroup',ensureAuth, groupsController.updateGroup)

router.delete('/deleteGroup',ensureAuth, groupsController.deleteGroup)

router.get('/editGroup/:id',ensureAuth, groupsController.editGroup)

module.exports = router
