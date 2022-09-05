const mongoose = require("mongoose");

const EntriesSchema = new mongoose.Schema({
  entry: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  mood: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Entries", EntriesSchema);
