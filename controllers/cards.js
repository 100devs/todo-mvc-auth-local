const { Card, Deck } = require('../models/card')

module.exports = {
  getDashboard: async (req,res) => {
    try{
      // get all of the cards the user has
      const cards = await Card.find({ userId: req.user.id }).lean()
      // get all of the decks the user has
      const decks = await Deck.find({ userId: req.user.id }).lean()
      // get the sample cards
      const sampleCards = await Card.find({ deck: '6315d1407a426b973c86f3e8' }).lean()
      // send all information over to the view
      res.render('cards.ejs', { cards: cards, decks: decks, sampleCards: sampleCards})
    }catch(err){
      console.error(err)
      res.render('error/500')
    }
  },
  getDeck: async (req,res) => {
    console.log(req.user)
    try{
      // get all of the cards in the deck
      const cards = await Card.find({ deck: req.params.id }).lean()
      console.log(cards)
      // get all of the decks the user has
      const decks = await Deck.find({ userId: req.user._id }).lean()
      // send all information over to the view
      res.render('cards.ejs', { cards: cards, decks: decks, sampleCards: [] })
    }catch(err){
      console.error(err)
      res.render('error/500')
    }
  },
  getAddCard: (req,res) => {
    res.render('addCard.ejs')// before -> res.render('add.ejs')
  },
  processAddCard: async (req,res) => {
    try{
      // obtaining a list of all deck names the user has
      const decks = await Deck.distinct('title', { userId: req.user.id })
      
      // setting the value of the title to what's in the DB or what the user entered
      const deckTitle = /*decks.filter(deck => !req.body.deckTitle.localeCompare(deck, 'en', { sensitivity: 'base' }))[0] ||*/ req.body.deckTitle.replace(/\s\s+/g, ' ').trim()
      console.log(deckTitle)
      // finding the specific deck
      let deck = await Deck.findOne({ title: deckTitle })
      
      // if no deck, create a new deck
      if(!deck){
        deck = await Deck.create({
          title: deckTitle,
          userId: req.user.id,
        })
        console.log('A new deck was created!')
      }

      const card = await Card.create({ 
        question: req.body.question, 
        answer: req.body.answer,
        userId: req.user.id,
        deck: deck._id,
      })
      
      // update the deck with the card created
      await Deck.findByIdAndUpdate(deck._id, {
        $push: {
          "cards": card._id
        }
      }, () => console.log('Card added to deck!'))

      console.log('A new card has been created!!')
      res.redirect('/cards')
    } catch(err){
      console.error(err)
      //res.render('error/500')
    }
  },
  getUpdateCard: async (req,res) => {
    try{
      const card = await Card.findById(req.params.id).lean()
      // ensure card is in collection (should be a redundency)
      if(!card){
        res.render('error/404')
      }

      // ensure that the userId matches userId on card (additional redundency)
        res.render('editCard.ejs', { card: card })
      
    } catch(err){
      console.error(err)
      res.render('error/500')
    }
  },
  processUpdateCard: async (req,res) => {
    try{
      const card = await Card.findById(req.params.id).lean()

      // ensure card is in collection (should be a redundency)
      if(!card){
        res.render('error/404')
      }

      // ensure that the userId matches userId on card (additional redundency)
      if(card.userId !== req.user.id){
        res.redirect('/cards')
      } else {
        await Card.findOneAndUpdate({ _id: req.params.id }, {
          question: req.body.question, 
          answer: req.body.answer
        },{
          // ensures updates match model schema
          runValidators: true
        })
        console.log('Your card has been updated!')
        res.redirect('/cards')
      }
    } catch(err){
      console.error(err)
      res.render('error/500')
    }
  },
  deleteCard: async (req,res) => {
    try{
      const card = await Card.findOne({ _id: req.body.cardToDelete })
      if(card.userId !== req.user.id){
        res.redirect('/cards')
      } else {
        await Card.remove({ _id: req.body.cardToDelete})
        console.log('Card has been deleted!')
        res.json('Card has been deleted!')
      }
    } catch(err){
      console.error(err)
    }
  }
} 