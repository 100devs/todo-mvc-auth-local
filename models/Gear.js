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
    enum: ["fair", "good", "excellent", "mint"],
    required: true,
  },
  gearNote: {
    type: String,
  },
  gearImage: {
    type: String,
    default:
      "https://w7.pngwing.com/pngs/111/313/png-transparent-heavy-metal-rock-music-sign-of-the-horns-others-text-hand-logo.png",
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  visibility: {
    type: String,
    default: "public",
    enum: ["public", "private"],
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Gear", GearSchema);
