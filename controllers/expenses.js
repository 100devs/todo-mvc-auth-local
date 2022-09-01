const Expense = require("../models/Expenses");

const createExpense = async (req, res) => {
  try {
    await Expense.create({
      amount: Number(req.body.amount) * 100,
      currency: req.body.currency,
      date: req.body.date,
      category: req.body.category,
      user: req.user.id,
    });
    console.log("Expense has been added!");
    res.redirect("/budget");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createExpense,
};
