const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const countBacklog = await Todo.countDocuments({userId:req.user.id,backlog: true})
            const countTodo = await Todo.countDocuments({userId:req.user.id,toDo: true})
            const countDoing = await Todo.countDocuments({userId:req.user.id,doing: true})
            const countCompleted = await Todo.countDocuments({userId:req.user.id,completed: true})
            res.render('todos.ejs', {todos: todoItems, leftBacklog: countBacklog, leftTodo: countTodo, leftDoing: countDoing, leftCompleted: countCompleted, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todoName: req.body.todoItem, backlog: true, toDo: false, doing: false, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    changeStatus: async (req, res)=>{
        try{
            const taskStatus = await Todo.find({_id:req.body.todoIdFromJSFile})
            if (taskStatus[0].backlog) {
                await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                    backlog: false,
                    toDo: true
            })}
            else if (taskStatus[0].toDo) {
                await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                    toDo: false,
                    doing: true
            })}
            else if (taskStatus[0].doing) {
                await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                    doing: false,
                    completed: true
            })}
            else if (taskStatus[0].completed) {
                await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                    completed: false,
                    toDo: true
            })}
            console.log(taskStatus)
            console.log('Changed Status')
            res.json('Changed Status')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                backlog: false,
                toDo: false,
                doing: false,
                completed: true
            })
            console.log('Marked Complete')
            console.log({_id:req.body.todoIdFromJSFile})
            res.json('Marked Complete')
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