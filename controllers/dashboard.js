const passport = require("passport");
const validator = require("validator");
const Gear = require("../models/Gear");
const User = require("../models/User");

module.exports = {
  showDashboard: async (req, res) => {
    try {
      console.log("This is the Dashboard Controller speaking. Volume to 11!");
      res.render("dashboard.ejs", { user: req.user });
    } catch (err) {
      console.error(err);
    }
  },
  showPublicWishlist: async (req, res) => {
    try {
      const gearItems = await Gear.find({ visibility: "public" });
      console.log("This is the Dashboard Controller speaking. Volume to 11!");
      res.render("publicWishlist.ejs", { gears: gearItems, user: req.user });
    } catch (err) {
      console.error(err);
    }
  },
  showPrivateWishlist: async (req, res) => {
    try {
      const gearItems = await Gear.find({
        userId: req.user.id,
        visibility: "private",
      });
      console.log("This is the Dashboard Controller speaking. Volume to 11!");
      res.render("privateWishlist.ejs", { gears: gearItems, user: req.user });
    } catch (err) {
      console.error(err);
    }
  },
};
