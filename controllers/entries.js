const Entries = require("../models/Entries");

module.exports = {
  getEntries: async (req, res) => {
    console.log(req.user);
    try {
      const entryItems = await Entries.find({ userId: req.user.id });
      res.render("dashboard.ejs", {
        Entries: entryItems,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createEntry: async (req, res) => {
    try {
      await Entries.create({
        entry: req.body.entryItem,
        date: req.body.date,
        title: req.body.title,
        mood: req.body.mood,
        userId: req.user.id,
      });
      console.log("Entry has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
  deleteEntry: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log("Deleted Todo");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
