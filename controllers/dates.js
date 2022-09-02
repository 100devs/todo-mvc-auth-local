const Date = require('../models/Date');

module.exports = {
  getDates: async (req, res) => {
    console.log(req.user);
    try {
      const dates = await Date.find({ userId: req.user.id });
      res.render('dates.ejs', { user: req.user, dates: dates });
    } catch (err) {
      console.log(err);
    }
  },
  createDate: async (req, res) => {
    const date = req.body.date;
    const mealType = req.body.mealType;
    const foodItems = req.body.foodItems;

    try {
      const newDate = await Date.create({
        userId: req.user.id,
        [mealType]: foodItems,
        date: date,
      });
      console.log(newDate);
      res.redirect('/dates');
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
