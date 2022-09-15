const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        console.log(req.query.sortBy)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            let items = [...todoItems]
           
            if(req.query.sortBy === 'importance'){
                const order = ['high', 'medium', 'low']

                items = items.sort((a,b)=>{
                    let aimportance = a.importance
                    let bimportance = b.importance
                    if (req.query.direction === 'asc'){
                        return order.indexOf(bimportance) - order.indexOf(aimportance)
                    }
                    return order.indexOf(aimportance) - order.indexOf(bimportance)
                })
                
            }
            res.render('todos.ejs', {todos: items, left: itemsLeft, user: req.user, query: req.query})
        }catch(err){
            console.log(err)
        }
    },
    getTodosHistory: async(req,res)=>{
        try{
           // const completedItems = await
        }
        catch{
            
        }
    },
    // getTodosByImportance: async (req,res)=>{
    //     console.log(req.user)
    //     try{
    //         const todoItems = await Todo.find({userId:req.user.id})
    //         const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            
    //         console.log(todoItems)
    //         res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
    //     }catch(err){
    //         console.log(err)
    //     }
    
    createTodo: async (req, res)=>{
        console.log(req.body)
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, importance: req.body.importance, userId: req.user.id}) //added importance
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
    }
}    