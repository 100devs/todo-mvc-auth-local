const Message = require('../models/Message')

module.exports = {
    getMessages: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Message.find({userId:req.user.id})
            const itemsLeft = await Message.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createMessage: async (req, res)=>{
        try{
            await Message.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/messages')
        }catch(err){
            console.log(err)
        }
    },
    markLiked: async (req, res)=>{
        try{
            await Message.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markUnliked: async (req, res)=>{
        try{
            await Message.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteMessage: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Message.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    