const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({
                userId:req.user.id,
                workingOn:false,
                completed:false,
                archive:false
            })
            const itemsLeft = await Todo.countDocuments({
                userId:req.user.id,
                archive: false,
                workingOn: false,
                completed: false
            })

            const todosCompleted = await Todo.find({
                userId:req.user.id,
                completed: true
            })

            const currentWorkingOn = await Todo.find({
                userId:req.user.id,
                workingOn: true,
            })


            // const todosArchived = await Todo.find({
            //     userId:req.user.id,
            //     archive: true
            // })
            
            
            res.render('todos.ejs', {
                todos: todoItems, 
                left: itemsLeft, 
                workingOn: currentWorkingOn,
                completed: todosCompleted,
                user: req.user
            })

            console.log(todosCompleted)

            console.log(req.user)
        }catch(err){
            console.log(err)
        }
    },

    createTodo: async (req, res)=>{
        try{
            await Todo.create({
                todo: req.body.todoItem, 
                completed: false, 
                archive: false,
                workingOn: false,
                userId: req.user.id
            })
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },

    markWorkingOn: async (req, res) =>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                workingOn: true,
            })
            console.log('Moved to working on')
            res.json('Moved to working on')
        }catch(err){
            console.log(err)
        }
    },

    markArchive: async (req, res) =>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                archive: true,
                completed: false
            })
            console.log('Mark archive')
            res.json('Mark archive')
        }catch(err){
            console.log(err)
        }
    },

    unmarkArchive: async (req, res) =>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                archive: false,
            })
            console.log('Unmark archive')
            res.json('Unmark archive')
        }catch(err){
            console.log(err)
        }
    },

    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({
                _id:req.body.todoIdFromJSFile
            },{
                completed: true,
                workingOn: false
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    unmarkComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false,
                workingOn: true
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
    }
}  