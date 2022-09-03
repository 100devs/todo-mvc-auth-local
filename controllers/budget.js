const Budget = require("../models/Budget");
const Expense = require("../models/Expenses");

const getBudget = async (req, res, next) => {
  try {
    const budget = await Budget.find({ user: req.user.id });
    const expenses = await Expense.find({ user: req.user.id });

    const categories = req.user.categories;
    const currencies = req.user.currencies;
    console.log(req.user.currencies);

    res.render("budget.ejs", {
      budget: budget,
      expenses: expenses,
      user: req.user,
      categories,
      currencies,
    });
  } catch (err) {
    // next(err) sends the error to the error handler
    next(err);
  }
};

const createBudget = async (req, res, next) => {
  try {
    // Find expenses in the period between startDate and endDate
    const expenses = await Expense.find({ user: req.user.id });
      // $and: [
      //   { user: req.user.id },
      //   { date: { $gte: req.body.startDate } },
      //   { date: { $lte: req.body.endDate } },
      // ],
 
    // Total of the expenses
    const totalExpenses = expenses.reduce((a, e) => a + e.amount, 0);
    console.log(`total: ${totalExpenses}`);

    // Create a new budget
    await Budget.create({
      initialAmount: Number(req.body.initialAmount) * 100,
      remainingAmount: Number(req.body.initialAmount) * 100 - totalExpenses, // Subtract the expenses in this period
      // currency: req.body.currency,
      // startDate: req.body.startDate,
      // endDate: req.body.endDate,
      user: req.user.id,
    });
    console.log("Budget has been added!");
    res.redirect("/budget");
  } catch (err) {
    next(err);
  }
};

const editBudget = async (req, res) => {
  try {
    await Budget.findOneAndUpdate( //add edit functionality to budget page. Maybe add in collapsable div that hides and shows form?
      { _id: req.body.idFromJSFile },
      {
        amount: Number(req.body.amount) * 100,
        // currency: req.body.currency,
        // startDate: req.body.startDate,
        // endDate: req.body.endDate,
        user: req.user.id,
      }
    );
    console.log("Budget has been updated!");
    res.redirect("/budget");
  } catch (err) {
    console.log(err);
  }
};

//would it make more sense here to make all expenses over the same range net to a negative tally?
const deleteBudget = async (req, res) => {
  try {
    await Budget.findOneAndDelete(
      { _id: req.body.idFromJSFile } //Add trash can to views page
    );
    console.log("Budget has been deleted!");
    res.json("deleted");
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
