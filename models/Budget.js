const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema(
  {
    initialAmount: {
      type: Number,
      required: true,
    },
    remainingAmount: {
      type: Number, // store in cents to avoid rounding errors
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Budget", BudgetSchema);
