const Expense = require("../models/Expenses");
const Budget = require("../models/Budget");

const createExpense = async (req, res, next) => {
  try {
    // Parse the data submitted in the form
    let { amount, category } = req.body;
    amount = Number(amount) * 100;
    console.log({ amount, category });
    const user = req.user;
    // Create a document in 'expenses' collection
    await Expense.create({ amount, category, user: user.id });

    // Change the budget for the respective time period
    const budget = await Budget.findOne({ user: user.id });
      // $and: [
      //   { user: user.id },
      //   // { startDate: { $lte: date } },
      //   // { endDate: { $gte: date } },
      // ],
    console.log("Budget:");
    console.log(budget);
    // Update remaining budget
    if (budget) {
      await Budget.findOneAndUpdate(
        { _id: budget._id },
        {
          remainingAmount: budget.remainingAmount - amount,
        }
      );
    }

    console.log("Expense has been added!");
    res.redirect("/budget");
  } catch (err) {
    next(err);
  }
};

const deleteExpense = async (req, res) => { //add trash can next to each expense in budget page.
  try {
    const expense = await Expense.findOne({ _id: req.body.idFromJSFile });

    const budget = await Budget.findOne({ user: user.id });
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
      // currency: req.body.currency,
      category: req.body.category,
      user: req.user.id,
    }

    // if (editedExpense.date !== initialExpense.date){
    //     //fix budgets
    // }

    // if (editedExpense.amount !== initialExpense.amount){
    //     //fix budgets
    // }

    await Expense.findOneAndUpdate({
      _id: initialExpense._id
    }, {
      amount: Number(req.body.amount) * 100,
      // currency: req.body.currency,
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
