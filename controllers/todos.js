const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({ userId: req.user.id });
            const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false });

            const highs = todoItems.filter(t => t.priority === 'high');
            const normals = todoItems.filter(t => t.priority === 'normal');
            const lows = todoItems.filter(t => t.priority === 'low');

            res.render('todos.ejs', { highs, normals, lows, left: itemsLeft, user: req.user });
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id, priority: req.body.priority || 'normal'})
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
    updatePriority: async (req, res) => {
        try {
            const { todoIdFromJSFile, newPriority } = req.body;
            if (!['high','normal','low'].includes(newPriority)) return res.status(400).json('Invalid priority');

            await Todo.findOneAndUpdate(
                { _id: todoIdFromJSFile, userId: req.user.id },
                { priority: newPriority }
            );
            res.json('Priority updated');
        } catch(err) {
            console.log(err);
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
    editTodo: async (req, res) => {
    try {
        await Todo.findOneAndUpdate(
            { _id: req.body.todoIdFromJSFile, userId: req.user.id }, // secure by user
            { todo: req.body.newTodoText }
        );
        console.log('Todo Edited');
        res.json('Todo Edited');
        } catch (err) {
            console.log(err);
        }
    }
}    