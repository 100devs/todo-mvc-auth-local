const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number, // store in cents to avoid rounding errors
      required: true,
    },
    // currency: {
    //   type: String,
    //   required: true,
    //   default: "USD",
    // },
    // date: {
    //   type: Date,
    //   required: true,
    // },
    category: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
