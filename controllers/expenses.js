const Expense = require("../models/Expenses");
const Budget = require("../models/Budget");

const createExpense = async (req, res, next) => {
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
    next(err);
  }
};

module.exports = {
  createExpense,
};
