const Gear = require("../models/Gear");

module.exports = {
  createGear: async (req, res) => {
    try {
      await Gear.create({
        gearName: String,
        gearBrand: String,
        gearPrice: Number,
        gearCondiditon: String,
        gearNote: req.gearNote,
        visibility: "public",
        userId: req.user.id,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
