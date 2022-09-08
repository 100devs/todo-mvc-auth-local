const Grocery = require('../models/Grocery')

module.exports = {
    getGroceries: async (req,res)=>{
        console.log(req.user)
        try{
            const groceryItems = await Grocery.find({userId:req.user.id})
            const itemsLeft = await Grocery.countDocuments({userId:req.user.id,completed: false})
            res.render('groceries.ejs', {groceries: groceryItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createGrocery: async (req, res)=>{
        try{
            await Grocery.create({ quantity: req.body.itemNumber, grocery: req.body.groceryItem, completed: false, userId: req.user.id})
            console.log('Grocery has been added!')
            res.redirect('/groceries')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Grocery.findOneAndUpdate({_id:req.body.groceryIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Grocery.findOneAndUpdate({_id:req.body.groceryIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteGrocery: async (req, res)=>{
        console.log(req.body.groceryIdFromJSFile)
        try{
            await Grocery.findOneAndDelete({_id:req.body.groceryIdFromJSFile})
            console.log('Deleted Grocery')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    