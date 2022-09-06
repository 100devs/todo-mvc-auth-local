const BlogPost = require('../models/BlogPost')

module.exports = {
    getPosts: async (req,res)=>{
        console.log(req.user)
        try{
            const postItems = await BlogPost.find({userId:req.user.id}).sort({date: -1})
            const numberOfPosts = await BlogPost.countDocuments({userId:req.user.id})
            res.render('listPosts.ejs', {BlogPost: postItems, postCount: numberOfPosts, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getEditPostPage: async (req,res)=>{
        console.log(req.params.id)
        try{
            const postToEdit = await BlogPost.findById(req.params.id)
            res.render('editPost.ejs', {blogPost: postToEdit, postId:req.params.id, user: req.user})
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
    getDisplayPostPage: async (req,res)=>{
        console.log(req.params.id)
        try{
            const postToDisplay = await BlogPost.findById(req.params.id)
            res.render('displayOnePost.ejs', {blogPost: postToDisplay, postId:req.params.id, user: req.user})
        }catch(err){
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
    editBlogPost: async (req, res)=>{
        try{
            await BlogPost.findOneAndUpdate({_id: req.params.id}, {
                title: req.body.title,
                body: req.body.postBody,
                gitHub: req.body.gitHub,
                date: req.body.date,
                dueDate: req.body.dueDate,
                mood: req.body.mood,
                userId: req.user.id})
            console.log(`Blog post ${req.params.id} has been updated!`)
            res.redirect('/blogpost')
        }catch(err){
            console.log(err)
        }
    },
    deletePost: async (req, res)=>{
        try{
            await BlogPost.findOneAndDelete({_id: req.body.postIdFromJSFile})
            console.log('Deleted Post')
            res.json('Deleted It')
            
        }catch(err){
            console.log(err)
        }
    }
}
