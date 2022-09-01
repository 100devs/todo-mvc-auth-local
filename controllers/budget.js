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

const editBudget = async (req, res) => {
  try {
    await Budget.findOneAndUpdate( //add edit functionality to budget page. Maybe add in collapsable div that hides and shows form?
      { _id: req.body.idFromJSFile },
      {
        amount: Number(req.body.amount) * 100,
        currency: req.body.currency,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        user: req.user.id,
      }
    );
    console.log("Budget has been updated!");
    res.redirect("/budget");
  } catch (err) {
    console.log(err);
  }
};

const deleteBudget = async (req, res) => {
  try {
    await Budget.findOneAndDelete(
      { _id: req.body.idFromJSFile } //Add trash can to views page
    );
    console.log("Budget has been deleted!");
    res.redirect("/budget");
  } catch (err) {
    console.log(err);
  }
};


module.exports = {
  getBudget,
  createBudget,
  editBudget,
  deleteBudget,
};
