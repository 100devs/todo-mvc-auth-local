const Expense = require("../models/Expenses");
const Budget = require("../models/Budget");

const createExpense = async (req, res, next) => {
  try {
    // Parse the data submitted in the form
    let { amount, currency, date, category } = req.body;
    amount = Number(amount) * 100;
    console.log({ amount, currency, date, category });
    const user = req.user;
    // Create a document in 'expenses' collection
    await Expense.create({ amount, currency, date, category, user: user.id });

    // Change the budget for the respective time period
    const budget = await Budget.findOne({
      $and: [
        { user: user.id },
        { startDate: { $lte: date } },
        { endDate: { $gte: date } },
      ],
    });
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

module.exports = {
  createExpense,
};
