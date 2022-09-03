const Card = require('../models/card')

module.exports = {
  getDashboard: async (req,res) => {
    console.log(req.user)
    try{
      // get all of the cards the user has
      const cards = await Card.find({ user: req.user.id }).lean()
      // get an array of all of the decks the user has
      const decks = await Card.distinct('deck', { user: req.user.id }).lean()
      // send all information over to the view
      res.render('card.ejs', {cards: cards, decks: decks, user: req.user})
    }catch(err){
      console.error(err)
      res.render('error/500')
    }
  },
  getAddCard: (req,res) => {
    res.render('add.ejs')
  },
  processAddCard: async (req,res) => {
    try{
      await Card.create({ 
        question: req.body.question, 
        answer: req.body.answer,
        active: true,
        userId: req.user.id,
        deck: req.body.deck,
        //deckId: {} //determine how to generate deckId
      })
      console.log('A new card has been created!!')
      res.redirect('/cards')
    } catch(err){
      console.error(err)
      res.render('error/500')
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
      if(card.userId !== req.user.id){
        res.redirect('/cards')
      } else{
        res.render('cards/edit', { card: card })
      }
      
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
      res.render('error/500')
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