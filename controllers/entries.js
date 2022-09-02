// Copied from todo.js... for now

const Entry = require('../models/Entry')

module.exports = {
    getEntries: async (req,res)=>{
        console.log(req.user)
        try{
            // Get individual entry item
            const entryItems = await Entry.find({userId:req.user.id})
            
            
            const entryItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            
            res.render('entries.ejs', {entries: entryItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createEntry: async (req, res)=>{
        try{
            await Entry.create({entry: req.body.entryItem, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    
    markIncomplete: async (req, res)=>{
        try{
            await Entry.findOneAndUpdate({_id:req.body.entryIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Entry.findOneAndDelete({_id:req.body.entryIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    