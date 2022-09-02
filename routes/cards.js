const express = require('express')
const router = express.Router()
const cardsController = require('../controllers/cards')
const { ensureAuth } = require('../middleware/auth')

// @description     Show cards homepage
// @route           GET /cards
router.get('/', ensureAuth, cardsController.getDashboard)

// @description     Show add page
// @route           GET /cards/addCard
router.get('/addCard', ensureAuth, cardsController.getAddCard)

// @description     Process add form
// @route           POST /stories/createCard
router.post('/createCard', ensureAuth, cardsController.processAddCard)

// @description     Show update page
// @route           GET /cards/updateCard/:id
router.get('/updateCard/:id', ensureAuth, cardsController.getUpdateCard)

// @description     Process edit form
// @route           PUT /cards/updateCard
router.put('/updateCard', ensureAuth, cardsController.processUpdateCard)

// @description     Update card to Inactive
// @route           PUT /cards/markInactive
router.put('/markInactive', ensureAuth, cardsController.markInactive)

// @description     Update card to Active
// @route           PUT /cards/markActive
router.put('/markActive', ensureAuth, cardsController.markActive)

// @description     Delete card
// @route           GET /cards/deleteCard
router.delete('/deleteCard', ensureAuth, cardsController.deleteCard)


//***OPTIMIZATION****
// @description     Get deck name edit page
// @route           GET /cards/editDeck:deck
//router.get('/editDeck/:deck', ensureAuth)

// @description     Process deck name edit
// @route           PUT /cards/:deck
//router.put('/editDeck:deck', ensureAuth)

// @description     Delete entire deck
// @route           DELETE /cards/:deck
//router.delete('/deleteDeck:deck', ensureAuth)