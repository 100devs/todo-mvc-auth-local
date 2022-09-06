const Todo = require('../models/Todo')

module.exports = {
    getWatchList: async (req,res)=>{
        console.log(req.user)
        try{
            const watchListItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id})
            res.render('todos.ejs', {watchList: watchListItems, left: itemsLeft, user: req.user,})
            console.log(watchListItems)
        }catch(err){
            console.log(err)
        }
    },
    searchShows: async(req,res)=>{
        console.log(req.user)
        try{
            const name = req.body.name
            console.log(name)
            const abc = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
            const data = await abc.json()
            console.log(data)
            res.render('results.ejs',{data})
        } catch(error){
            console.error(error)
        }
    },
    addToWatchList: async(req,res)=>{
        console.log(req.user)
        try{
            await Todo.create({tvShowName: req.body.showName,tvShowId: req.body.showId, userId: req.user.id,showImg: req.body.showPic, showSum: req.body.showSummary, watched: false})
            // stops the browser from constantly loading.
            res.status(204).send()
        } catch(error){
            console.error(error)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                watched: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                watched: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteShow: async (req, res)=>{
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