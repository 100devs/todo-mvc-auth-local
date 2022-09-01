const Budget = require("../models/Budget");
const Expense = require("../models/Expenses");

const getBudget = async (req, res, next) => {
  try {
    const budget = await Budget.find({ user: req.user.id });
    const expenses = await Expense.find({ user: req.user.id });

    const categories = req.user.categories;
    console.log(categories);

    res.render("budget.ejs", {
      budget: budget,
      expenses: expenses,
      user: req.user,
      categories,
    });
  } catch (err) {
    // next(err) sends the error to the error handler
    next(err);
  }
};

const createBudget = async (req, res, next) => {
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
    next(err);
  }
};

module.exports = {
  getBudget,
  createBudget,
};
