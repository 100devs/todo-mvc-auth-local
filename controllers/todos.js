const Todo = require('../models/Todo')
const moment = require('moment')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id}).sort({completed:1}).sort({
                date: 1,})
            // const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },

    getTask: async (req,res)=>{
        console.log(req.user)
        try{
            const setDate = moment(req.body.findTask).format("YYYY-MM-DD").toString()
            console.log(setDate)
            // const todoItems = await Todo.find({userId:req.user.id}).find({date: {$gte: new Date(moment(req.body.findTask).format("YYYY-MM-DD") + 'T04:00:00.000+00:00'), $lte: new Date(moment(req.body.findTask).format("YYYY-MM-DD") + 'T04:00:00.000+00:00')}})
            const todoItems = await Todo.find({userId:req.user.id}).find({date: {$gte: new Date(moment(req.body.findTask).subtract(moment(req.body.findTask).utcOffset(), 'minutes').utc()), $lte: new Date(moment(req.body.findTask).subtract(moment(req.body.findTask).utcOffset(), 'minutes').utc())}})
            console.log(new Date(moment(req.body.findTask).subtract(moment(req.body.findTask).utcOffset(), 'minutes').utc()))
            console.log(req.body.findTask)
            // const findItems = await Todo.find({userId:req.user.id}).sort({completed:1}).sort({
            //     date: 1,})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },


    createTodo: async (req, res)=>{
        try{
            // await Todo.create({todo: req.body.todoItem, completed: false, date: new Date(moment(req.body.toDoDate).format('YYYY-MM-DD').replace(/-/g, '\/').replace(/T.+/, '')), userId: req.user.id, email: req.user.email})
            await Todo.create({todo: req.body.todoItem, completed: false, date: new Date(moment(req.body.toDoDate).subtract(moment(req.body.toDoDate).utcOffset(), 'minutes').utc()), userId: req.user.id, email: req.user.email})
            // console.log(new Date(moment(req.body.toDoDate).subtract(moment(req.body.toDoDate).utcOffset(), 'minutes').utc()))
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
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
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
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
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    markImportant: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                important: true
            })
            console.log('Marked Important')
            res.json('Marked Important')
        }catch(err){
            console.log(err)
        }
    },
    markNotImportant: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                important: false
            })
            console.log('Marked As Not Important')
            res.json('Marked As Not Important')
        }catch(err){
            console.log(err)
        }
    }
}    