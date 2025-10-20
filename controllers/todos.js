const Todo = require('../models/Todo')
const  { todoLabels } = require('../constants/labels')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            let todoItems


            if (req.query.filter){
                const filter = req.query.filter
                todoItems = await Todo.find({userId:req.user.id, label:filter})
            } else{
                todoItems = await Todo.find({userId:req.user.id})
            }
            
            res.render('todos.ejs', {
                todos: todoItems, 
                left: itemsLeft, 
                user: req.user,
                labels: todoLabels,
                filter: req.query.filter
            })
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({label: req.body.labelEmojiSelect, todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    editTodo: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoId},{label:req.body.labelEmojiSelect, todo: req.body.todoItem})
            console.log('Todo has been edited!')
            if (req.body.labelEmojiSelect == req.body.currentFilter){
                res.redirect(`/todos?filter=${req.body.currentFilter}`)
            }else {
                res.redirect('/todos')
            }
            
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
    clearTodos: async(req,res)=>{
        console.log("Destressing... clear all todos")
        try{
            await Todo.deleteMany({userId: req.user.id})
            console.log('All todos deleted')
            res.json('All Clear! Doesn\'t that feel better?')
        }catch(err){
            console.log(err)
        }
    }
}    