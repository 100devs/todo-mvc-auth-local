const Sendfeedback = require("../models/Sendfeedback");

module.exports = {
  // CREATE
  createSendfeedback: async (req, res) => {
    try {
      const sendfeedbackArr = await Sendfeedback.find({});
      const uniqID = (await sendfeedbackArr.length) + 1;
      await Sendfeedback.create({
        userId: uniqID,
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      });
      console.log("Sendfeedback has been added!");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },

  // READ
  getSendfeedback: async (req, res) => {
    console.log(req);
    try {
      // const todoItems = await Sendfeedback.find({userId:req.user.id})
      const sendfeedbackArr = await Sendfeedback.find({});
      // const itemsLeft = await Sendfeedback.countDocuments({userId:req.user.id,completed: false})
      // res.render('sendfeedback.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
      res.render("sendfeedback.ejs", { sendfeedbackArr: sendfeedbackArr });
      // res.send({Test: "Hello"})
    } catch (err) {
      console.log(err);
    }
  },

  // DELETE
  deleteSendfeedback: async (req, res) => {
    console.log(req.body.userId);
    // TODO add unique IDs
    try {
      await Sendfeedback.findOneAndDelete({ userId: req.body.userId });
      console.log("Deleted Feedback");
      res.json(`Deleted It ${req.body.userId}`);
    } catch (err) {
      console.log(err);
    }
  },
};
