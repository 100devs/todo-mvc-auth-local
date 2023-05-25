const Todo = require('../models/Todo')

module.exports = {
    //getTodos function
    getTodos: async(req, res) => {
        console.log(req.user)
        try {
            //todoItems = Todo find userId
            const todoItems = await Todo.find({ userId: req.user.id })
                //itemsLeft = Todo countDocuments userId and completed set to false
            const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false })
            res.render('todos.ejs', { todos: todoItems, left: itemsLeft, user: req.user })
        } catch (err) {
            console.log(err)
        }
    },
    //createTodo function
    createTodo: async(req, res) => {
        try {
            // Todo created with body, userId, and completed set to false
            await Todo.create({ todo: req.body.todoItem, completed: false, userId: req.user.id })
            console.log('Todo has been added!')
            res.redirect('/todos')
        } catch (err) {
            console.log(err)
        }
    },
    //markComplete function
    markComplete: async(req, res) => {
        try {
            //Todo finds the id
            await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        } catch (err) {
            console.log(err)
        }
    },
    //markIncomplete function
    markIncomplete: async(req, res) => {
        try {
            //Todo finds the id
            await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        } catch (err) {
            console.log(err)
        }
    },
    get markIncomplete() {
        return this._markIncomplete
    },
    set markIncomplete(value) {
        this._markIncomplete = value
    },
    //deleteTodo function
    deleteTodo: async(req, res) => {
        console.log(req.body.todoIdFromJSFile)
        try {
            //finds the id and deletes the todo 
            await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile })
            console.log('Deleted Todo')
            res.json('Deleted It')
        } catch (err) {
            console.log(err)
        }
    }
}