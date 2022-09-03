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
    {
      try {
        await Gear.create({
          gearName: req.body.gearName,
          gearBrand: req.body.gearBrand,
          gearPrice: req.body.gearPrice,
          gearCondition: req.body.gearCondition,
          gearNote: req.body.gearNote,
          completed: false,
          userId: req.user.id,
        });

        console.log(
          `${req.body.gearName} ${req.body.gearBrand} has been added!`
        );
        res.redirect("/gear");
      } catch (err) {
        console.log(err);
      }
    }
    // try {
    //   await Gear.create({
    //     gearName: String,
    //     gearBrand: String,
    //     gearPrice: Number,
    //     gearCondition: String,
    //     gearNote: req.gearNote,
    //     visibility: "public",
    //     userId: req.user.id,
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  },
};
