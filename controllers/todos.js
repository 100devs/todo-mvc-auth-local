const Todo = require('../models/Todo')
const Task = require("../models/Task")

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const taskItems = await Task.find({userId:req.user.id})
            // const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: taskItems, user: req.user})
            // res.json(taskItems)
        }catch(err){
            console.log(err)
        }
    },
    //just added the fields we want
    createTodo: async (req, res)=>{
        try{
           await Task.create({
                task: req.body.task,
                day: req.body.day,
                month: req.body.month,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                userId: req.user.id
            })
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            res.status(400).json({error: err.message})
        }
    },
    //original function
    // createTodo: async (req, res)=>{
    //     try{
    //         await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
    //         console.log('Todo has been added!')
    //         res.redirect('/todos')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
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
            await Task.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    //get todos based on url params like /todos/oct/10
    // only get todos with month of oct and day of 10
    //sends tasks back in json
    getTodosByDate: async (req,res) => {
        try {
            const tasks = await Task.find({userId: req.user.id, month: req.params.month, day: req.params.day })
            res.json(tasks)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }
}    