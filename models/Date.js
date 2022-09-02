const mongoose = require('mongoose');

const DatesSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  breakfast: {
    type: String,
  },
  lunch: {
    type: String,
  },
  dinner: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Date', DatesSchema);
