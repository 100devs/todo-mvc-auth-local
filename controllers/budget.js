const Budget = require("../models/Budget");
const Expense = require("../models/Expenses");

const getBudget = async (req, res) => {
  try {
    const budget = await Budget.find({ user: req.user.id });
    const expenses = await Expense.find({ user: req.user.id });

    res.render("budget.ejs", {
      budget: budget,
      expenses: expenses,
      user: req.user,
    });
  } catch (err) {
    console.log(err);
  }
};

const createBudget = async (req, res) => {
  try {
    await Budget.create({
      amount: Number(req.body.amount) * 100,
      currency: req.body.currency,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      user: req.user.id,
    });
    console.log("Budget has been added!");
    res.redirect("/budget");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getBudget,
  createBudget,
};
