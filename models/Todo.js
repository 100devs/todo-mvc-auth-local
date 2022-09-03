const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  list: {
    type: String,
    required: false,
  },
  todo: {
    type: String,
    required: true,
  },
  giftFor: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
