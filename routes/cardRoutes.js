const express = require('express')
const router = express.Router()
const cardController = require('../controllers/cardController') 
const {ensureAuth} = require('../middleware/auth')


router.get('/', ensureAuth, cardController.getCards)

router.post('/createCard', cardController.createCard)

router.route('/editCard')
    .get(cardController.editCardPage)
    .put(cardController.editCard)

router.delete('/deleteCard', cardController.deleteCard)

module.exports = router