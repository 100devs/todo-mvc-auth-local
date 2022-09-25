const Todo = require('../models/Todo')

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

    editTodo: async(req, res) => {
        try {
            let todoId = req.params.id
            let todoById = await Todo.findById({_id: todoId})
            res.render('editTodo.ejs', {title: 'Todo Manager', todoById})
            console.log(todoById)
        } catch (error) {
            console.log(error)
        }
    },

    editTodoOnPost: async(req,res) =>{
        try {
            req.body.user = req.body._id
            let todoId = req.params.id
            let todoById = await Todo.findByIdAndUpdate({_id: todoId}, {$set: {
                todo: req.body.todo
            }})
            res.redirect('/todos')
            console.log(todoById)
        } catch (error) {
            res.status(500).send({message:error.message || 'error occurred'})
        }
    }
}    