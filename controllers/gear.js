const Gear = require("../models/Gear");

module.exports = {
  getGear: async (req, res) => {
    console.log(req.user);
    try {
      res.render("gear.ejs");
    } catch (err) {
      console.log(err);
    }
  },
};

// NUKED

// const Gear = require("../models/Gear");

// module.exports = {
//   createGear: async (req, res) => {
//     try {
//       await Gear.create({
//         gearName: String,
//         gearBrand: String,
//         gearPrice: Number,
//         gearCondiditon: String,
//         gearNote: req.gearNote,
//         visibility: "public",
//         userId: req.user.id,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   },
//   getGear: async (req, res) => {
//     try {
//       console.log("Gear test");
//       res.render("gear.ejs");
//     } catch (err) {
//       console.error(err);
//     }
//   },
// };
