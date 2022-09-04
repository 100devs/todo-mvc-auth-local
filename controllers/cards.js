const { Card, Deck } = require('../models/card')

module.exports = {
  getDashboard: async (req,res) => {
    console.log(req.user)
    try{
      // get all of the cards the user has
      const cards = await Card.find({ user: req.user.id }).lean()
      // get all of the decks the user has
      const decks = await Deck.find({ user: req.user.id }).lean()
      // send all information over to the view
      res.render('cards.ejs', { cards: cards, decks: decks, user: req.user })
    }catch(err){
      console.error(err)
      res.render('error500.ejs')
    }
  },
  getAddCard: (req,res) => {
    try {
      res.render('addCard.ejs')// before -> res.render('add.ejs')
    } catch (err) {
      console.error(err)
      res.render('error404.ejs')
    }
  },
  processAddCard: async (req,res) => {
    try{
      // obtaining a list of all deck names the user has
      const decks = await Deck.distinct('title', { userId: req.user.id })

      // setting the value of the title to what's in the DB or what the user entered
      const deckTitle = decks.filter(deck => !deckTitle.localeCompare(deck, 'en', { sensitivity: base }))[0] || req.body.deckTitle.replace(/\s\s+/g, ' ').trim()

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
        active: true,
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
      res.render('error500.ejs')
    }
  },
  getUpdateCard: async (req,res) => {
    try{
      const card = await Card.findById(req.params.id).lean()
      // ensure card is in collection (should be a redundency)
      if(!card){
        res.render('error404.ejs')
      }

      // ensure that the userId matches userId on card (additional redundency)
      if(card.userId !== req.user.id){
        res.redirect('/cards')
      } else{
        res.render('cards/edit', { card: card })
      }
      
    } catch(err){
      console.error(err)
      res.render('error500.ejs')
    }
  },
  processUpdateCard: async (req,res) => {
    try{
      const card = await Card.findById(req.params.id).lean()

      // ensure card is in collection (should be a redundency)
      if(!card){
        res.render('error404.ejs')
      }

      // ensure that the userId matches userId on card (additional redundency)
      if(card.userId !== req.user.id){
        res.redirect('/cards')
      } else {
        await Card.findOneAndUpdate({ _id: req.params.id }, {
          question: req.body.question, 
          answer: req.body.answer, 
          deck: req.body.deck
        },{
          // ensures updates match model schema
          runValidators: true
        })
        console.log('Your card has been updated!')
        res.redirect('/cards')
      }
    } catch(err){
      console.error(err)
      res.render('error500.ejs')
    }
  },
  markInactive: async (req,res) => {
    try{
      await Card.findOneAndUpdate({ _id: req.body.cardIdFromJSFile }, { active: false }, { runValidators: true })
      console.log('Your card has been marked inactive!')
      res.json('Card has been marked inactive.')
    } catch(err){
      console.error(err)
    }
  },
  markActive: async (req,res) => {
    try{
      await Card.findOneAndUpdate({ _id: req.body.cardIdFromJSFile }, { active: true }, { runValidators: true })
      console.log('Your card has been marked active!')
      res.json('Card has been marked active.')
    } catch(err){
      console.error(err)
    }
  },
  deleteCard: async (req,res) => {
    try{
      await Card.remove({ _id: req.body.cardIdFromJSFile })
      console.log('Card has been deleted!')
      res.json('Card has been deleted!')
    } catch(err){
      console.error(err)
    }
  }
} 