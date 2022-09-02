const BlogPost = require('../models/BlogPost')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await BlogPost.find({userId:req.user.id})
            const itemsLeft = await BlogPost.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createBlogPost: async (req, res)=>{
        try{
            await BlogPost.create({
                title: req.body.title,
                body: req.body.postBody,
                github: req.body.github,
                date: new Date(),
                duedate: req.body.dueDate,
                mood: req.body.mood,
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
            await BlogPost.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}
