const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id}).lean()     // find todo item associated with userId
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            const todosPriority = todoItems.filter(todo => todo.priority)
            const todos = todoItems.filter(todo => !todo.priority)
            res.render('todos.ejs', {
                todosPriority: todosPriority, todos: todos, left: itemsLeft, user: req.user
            })
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id, priority: false})     // userId added to created todo item
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: req.body.completed
            })
            console.log('Marked Complete')
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
    },
    markPriority: async (req, res)=>{
        try{
            const todo = await Todo.findById(req.body.todoIdFromJSFile)
            await Todo.findOneAndUpdate(
                { _id: req.body.todoIdFromJSFile },
                { priority: !todo.priority }
            )
            console.log('Toggled Priority')
            res.json({ status: 'success', priority: !todo.priority })
        }catch(err){
            console.log(err)
        }
    },

}    