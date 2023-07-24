const Todo = require('../models/Todo')
const TodoList = require('../models/TodoList')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const todoLists = await TodoList.find({ownerId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user, todoLists: todoLists})
        }catch(err){
            console.log(err)
        }
    },
    createList: async (req, res)=>{
        try{
            await TodoList.create({name: req.body.todoList, ownerId: req.user.id})
            console.log('Todo List has been created!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id, todoListId: req.params.listId})
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
    deleteList: async (req, res)=>{
        try{
            let list = await TodoList.findById({_id: req.params.id});
            let todosInList = await Todo.countDocuments({todoListId: req.params.id})
            if(todosInList > 0){
                console.log("Can't delete List - Todos still in list")
                res.redirect("/todos")
            }else{
                await TodoList.remove({_id: req.params.id});
                console.log("List Deleted");
                res.redirect("/todos");
            }
        }catch(err){
            console.log(err)
            res.redirect("/todos");
        }
    },
}    