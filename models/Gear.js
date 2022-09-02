const mongoose = require("mongoose");

const GearSchema = new mongoose.Schema({
  gearName: {
    type: String,
    required: true,
    trim: true,
  },
  gearBrand: {
    type: String,
    required: true,
  },
  gearPrice: {
    type: Number,
    required: true,
  },
  gearCondition: {
    type: String,
    defualt: "good",
    enum: ["fair", "good", "excellent", "mint"],
    required: true,
  },
  gearNote: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  visibility: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Gear", GearSchema);
