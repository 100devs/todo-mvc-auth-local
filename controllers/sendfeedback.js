// createSendfeedback

const Sendfeedback = require('../models/Sendfeedback')

module.exports = {
    getSendfeedback: async (req,res)=>{
        console.log(req)
        try{
            // const todoItems = await Sendfeedback.find({userId:req.user.id})
            // const itemsLeft = await Sendfeedback.countDocuments({userId:req.user.id,completed: false})
            // res.render('sendfeedback.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
            res.render('sendfeedback.ejs', {test:"Hello"})
            // res.send({Test: "Hello"})
        }catch(err){
            console.log(err)
        }
    },

    createSendfeedback: async (req, res)=>{
        try{
            await Sendfeedback.create({name: req.body.name, email: req.body.email, phone: req.body.phone, message: req.body.message})
            console.log('Sendfeedback has been added!')
            res.redirect('/sendfeedback')
        }catch(err){
            console.log(err)
        }
    },

 
}    