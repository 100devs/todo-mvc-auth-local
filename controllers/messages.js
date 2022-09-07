const Message = require('../models/Message')
const User = require('../models/User')

module.exports = {
    getMessages: async (req,res)=>{
        console.log(req.user)
        try{
            let messages
            if (req.params.own) {
                messages = await Message.find({userId:req.user.id})
            } else {
                messages = await Message.find({})
            }
            messages.forEach(element => {
                if (element.userId == req.user._id) element.owned = true
            });
            res.render('messages.ejs', {messages: messages, user: req.user})
        }catch(err){
            console.log(err)
        }
    },

    createMessage: async (req, res)=>{
        try{
            const user = await User.findById(req.user.id)
            await Message.create({message: req.body.message, likes: 0, userId: req.user.id, userName: user.userName, replies: []})
            console.log('Message has been added!')
            res.redirect('/messages')
        }catch(err){
            console.log(err)
        }
    },
    markLiked: async (req, res)=>{
        try{
            const message = await Message.findOne({_id: req.body.messageId})
            console.log(message)
            await Message.findOneAndUpdate({_id: req.body.messageId},{
                likes: message.likes + 1
            })
            console.log('Like added')
            res.json('Like added')
        }catch(err){
            console.log(err)
        }
    },
    markUnliked: async (req, res)=>{
        try{
            const message = await Message.findOne({_id:req.body.messageId})
            await Message.findOneAndUpdate({_id: req.body.messageId},{
                likes: message.likes - 1
            })
            console.log('Like removed')
            res.json('Like removed')
        }catch(err){
            console.log(err)
        }
    },
    deleteMessage: async (req, res)=>{
        console.log(req.body.messageId)
        try{
            await Message.findOneAndDelete({_id:req.body.messageId})
            console.log('Deleted message')
            res.json('Deleted message')
        }catch(err){
            console.log(err)
        }
    },
    editMessage: async (req, res)=>{
        try{
            await Message.findOneAndUpdate({_id:req.body.messageId},{
                message: req.body.message
            })
            console.log('Message edited')
            res.json('Message edited')
        }catch(err){
            console.log(err)
        }
    }
}    