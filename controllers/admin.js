const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')
const Todo = require('../models/Todo')
const Group = require('../models/Group')

module.exports = {
    getGroups: async (req,res)=>{
        try{
            const groupItems = await Group.find()
            res.render('group/index.ejs', { groupItems , user: JSON.parse(JSON.stringify(req.user)), groupNumber: groupItems.length })
        }catch(err){
            console.log(err)
        }

    },
    getTodos: async (req,res)=>{
        try{
            const todoItems = await Todo.find();

            const complete = todoItems.filter(todo => todo.completed);
            const incomplete = todoItems.filter(todo => !todo.completed);
            res.render('todos.ejs', { complete, incomplete})
        }catch(err){
            console.log(err)
        }
    },
}
