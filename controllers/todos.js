const Todo = require('../models/Todo');

module.exports = {
  getTodos: async (req, res) => {
    console.log(req.user);
    try {
      // sorted by due date in ascending order
      const todoItems = await Todo.find({ userId: req.user.id }).sort({
        dueDate: 1,
      });
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      });
      res.render('todos.ejs', {
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
      //added a dueDate and urgent- binthroot - 8/31
      await Todo.create({
        todo: req.body.todoItem,
        dueDate: req.body.dueDate,
        urgent: req.body.urgent,
        completed: false,
        userId: req.user.id,
      });
      console.log('Todo has been added!');
      console.log(req.body);
      res.redirect('/todos');
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
      console.log('Marked Complete');
      res.json('Marked Complete');
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
      console.log('Marked Incomplete');
      res.json('Marked Incomplete');
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log('Deleted Todo');
      res.json('Deleted It');
    } catch (err) {
      console.log(err);
    }
  },
};
