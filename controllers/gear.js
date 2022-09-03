const Gear = require("../models/Gear"); // Requires the model schema

module.exports = {
  getGear: async (req, res) => {
    try {
      res.render("gear.ejs");
    } catch (err) {
      console.error(err);
    }
  },
  createGear: async (req, res) => {
    console.log("createGear function started.");
    res.render("itWorks.ejs");
    // try {
    //   await Gear.create({
    //     gearName: String,
    //     gearBrand: String,
    //     gearPrice: Number,
    //     gearCondiditon: String,
    //     gearNote: req.gearNote,
    //     visibility: "public",
    //     userId: req.user.id,
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  },
};
