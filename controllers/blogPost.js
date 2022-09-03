const BlogPost = require('../models/BlogPost')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await BlogPost.find({userId:req.user.id})
            const itemsLeft = await BlogPost.countDocuments({userId:req.user.id})
            res.render('todos.ejs', {BlogPost: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    editPost: async (req,res)=>{
        console.log(req.user)
        try{
            const postToEdit = await BlogPost.find({_id:req.id})

            res.redirect('/blogPost')
        }catch(err){
            console.log(err)
        }
    },
    getCreatePostPage: async (req,res) => {
        try {
            res.render('createPost.ejs', {user: req.user})
        }
        catch(err) {
            console.log(err)
        }
    },
    createBlogPost: async (req, res)=>{
        try{
            await BlogPost.create({
                title: req.body.title,
                body: req.body.postBody,
                gitHub: req.body.gitHub,
                date: new Date(),
                dueDate: req.body.dueDate,
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
