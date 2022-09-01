const Expense = require("../models/Expenses");
const Budget = require("../models/Budget");

const createExpense = async (req, res) => {
  try {
    await Expense.create({
      amount: Number(req.body.amount) * 100,
      currency: req.body.currency,
      date: req.body.date,
      category: req.body.category,
      user: req.user.id,
    });

    // Change the budget for the respective time period
    const budget = await Budget.findOne({
      $and: [
        { startDate: { $lte: req.body.date } },
        { endDate: { $gte: req.body.date } },
      ],
    });
    console.log(budget);

    await Budget.findOneAndUpdate(
      { _id: budget._id },
      {
        amount: Number(budget.amount) - Number(req.body.amount) * 100,
      }
    );

    console.log("Expense has been added!");
    res.redirect("/budget");
  } catch (err) {
    console.log(err);
  }
};

const deleteExpense = async (req, res) => { //add trash can next to each expense in budget page.
  try {
    const expense = await Expense.findOne({ _id: req.body.idFromJSFile });

    const budget = await Budget.findOne({
      $and: [
        { startDate: { $lte: req.body.date } },
        { endDate: { $gte: req.body.date } },
      ],
    });
    console.log(budget);

    await Budget.findOneAndUpdate(
      { _id: budget._id },
      {
        amount: Number(budget.amount) + Number(expense.amount) * 100,
      }
    );

    await Expense.deleteOne({
      _id: expense._id
    });

    console.log("Expense has been deleted and budget adjusted!");
    res.redirect("/budget");
  } catch (err) {
    console.log(err);
  }
};

const editExpense = async (req, res) => { //need to add collapsable form next to each expense in budget page.
  try {
    const initialExpense = await Expense.findOne({ _id: req.body.idFromJSFile });

    const editedExpense = {
      amount: Number(req.body.amount) * 100,
      currency: req.body.currency,
      date: req.body.date,
      category: req.body.category,
      user: req.user.id,
    }

    if (editedExpense.date !== initialExpense.date){
        //fix budgets
    }

    if (editedExpense.amount !== initialExpense.amount){
        //fix budgets
    }

    await Expense.findOneAndUpdate({
      _id: initialExpense._id
    }, {
      amount: Number(req.body.amount) * 100,
      currency: req.body.currency,
      date: req.body.date,
      category: req.body.category,
      user: req.user.id,
    });

    console.log("Expense has been updated and budget adjusted!");
    res.redirect("/budget");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createExpense,
  deleteExpense,
  editExpense,
};
