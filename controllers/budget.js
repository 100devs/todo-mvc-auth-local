const Budget = require("../models/Budget");

const getBudget = async (req, res) => {
  try {
    const budget = await Budget.find({ user: req.user.id });
    res.render("budget.ejs", { budget: budget, user: req.user });
  } catch (err) {
    console.log(err);
  }
};

const createBudget = async (req, res) => {
  try {
    await Budget.create({
      amount: req.body.amount,
      currency: req.body.currency,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      user: req.user.id,
    });
    console.log("Todo has been added!");
    res.redirect("/budget");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getBudget,
  createBudget,
};
