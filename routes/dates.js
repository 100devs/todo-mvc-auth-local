const express = require('express');
const router = express.Router();
const datesController = require('../controllers/dates');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, datesController.getDates);

router.post('/', datesController.createDate);

router.put('/', datesController.updateDate);

router.delete('/:dateid', datesController.deleteDate);

module.exports = router;
