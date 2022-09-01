const Date = require('../models/Date');

module.exports = {
  getDates: async (req, res) => {
    console.log(req.user);
    try {
      // const todoItems = await Todo.find({userId:req.user.id})
      // const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
      res.render('dates.ejs', { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createDate: async (req, res) => {
    console.log(req.body.date, req.body.mealType, req.body.foodItems);
    try {
      // await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
      // console.log('Todo has been added!')
      // res.redirect('/todos')
    } catch (err) {
      console.log(err);
    }
  },
  updateDate: async (req, res) => {
    try {
      // await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
      //     completed: true
      // })
      // console.log('Marked Complete')
      // res.json('Marked Complete')
    } catch (err) {
      console.log(err);
    }
  },
  deleteDate: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      // await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
      // console.log('Deleted Todo')
      // res.json('Deleted It')
    } catch (err) {
      console.log(err);
    }
  },
};
