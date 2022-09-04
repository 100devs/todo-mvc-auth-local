const Todo = require('../models/Todo');
const moment = require('moment');

module.exports = {
  getTodos: async (req, res) => {
    try {
      const todoItems = await Todo.find({ userId: req.user.id });
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      });

      todoItems.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.deadline) - new Date(a.deadline);
      });
      res.render('todos.ejs', {
        todos: todoItems,
        left: itemsLeft,
        user: req.user,
        moment: moment,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (req, res) => {
    console.log(req.body);
    try {
      await Todo.create({
        todo: req.body.todoItem,
        completed: false,
        userId: req.user.id,
        deadline: req.body.deadline,
      });
      console.log('Todo has been added!');
      res.redirect('/todos');
    } catch (err) {
      console.log(err);
    }
  },
//   markComplete: async (req, res) => {
//     try {
//       await Todo.findOneAndUpdate(
//         { _id: req.body.todoIdFromJSFile },
//         {
//           completed: true,
//         }
//       );
//       console.log('Marked Complete');
//       res.json('Marked Complete');
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   markIncomplete: async (req, res) => {
//     try {
//       await Todo.findOneAndUpdate(
//         { _id: req.body.todoIdFromJSFile },
//         {
//           completed: false,
//         }
//       );
//       console.log('Marked Incomplete');
//       res.json('Marked Incomplete');
//     } catch (err) {
//       console.log(err);
//     }
//   },
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
    markCompleteIncomplete: async (req, res) => {
        try {
            const currentCompleted = await Todo.findById(req.body.todoIdFromJSFile, 'completed')
                await Todo.findOneAndUpdate(
            { _id: req.body.todoIdFromJSFile },
            {
              completed: !currentCompleted.completed,
            }
          );
          console.log(`Marked as Completed = ${!currentCompleted.completed}`);
          res.json(`Marked as Completed = ${ !currentCompleted.completed}`);
        } catch (err) {
          console.log(err);
        }
      },
};
