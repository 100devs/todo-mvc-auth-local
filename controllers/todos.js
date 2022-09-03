const Todo = require("../models/Todo");

module.exports = {
  getTodos: async (req, res) => {
    // console.log(req.user)
    try {
      const todoItems = await Todo.find({ userId: req.user.id }).sort({
        todo: 1,
      });
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      });
      res.render("todos.ejs", {
        todos: todoItems,
        left: itemsLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (req, res) => {
    try {
      await Todo.create({
        todo: req.body.todoItem,
        giftFor: req.body.giftFor,
        completed: false,
        userId: req.user.id,
      });
      console.log("Todo has been added!");
      res.redirect("/todos");
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log("Deleted Todo");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
  sortAToB: async (req, res) => {
    try {
      const christmasGifts = await Todo.find({ userId: req.user.id });
      //find the user
      //sort the users "for:" alphabetically sort(arg: string | any): this;
      res.render("todos.ejs", {}); //render alphabetical for seciton
      await Todo.sort({ giftFor: 1 }); //this'll be waiting a long time
    } catch (err) {
      console.log(err);
      console.log("you got hella errs brah!");
    }
  },
};
