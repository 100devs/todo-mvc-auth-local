const Todo = require('../models/BlogPost')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createBlogPost: async (req, res)=>{
        try{
            await Todo.create({
                title: req.body.todoItem,
                body: req.body.todoItem,
                github: req.body.todoItem,
                date: req.body.todoItem,
                duedate: req.body.todoItem,
                mood: req.body.todoItem,
                userId: req.user.id})
            console.log('Blog has been posted!')
            res.redirect('/blogpost')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    