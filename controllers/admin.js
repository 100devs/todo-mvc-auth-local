const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')
const Todo = require('../models/Todo')
const Group = require('../models/Group')

module.exports = {
    getGroups: async (req,res)=>{
        try{
                const groupItems = await Group.aggregate([{
                $lookup:
                {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "groupAdmin"
                }
            }])

            res.render('group/index.ejs', { groupItems , groupNumber: groupItems.length, adminPage: req.originalUrl.includes('manageGroup') })
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
