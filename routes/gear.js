const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const gearController = require("../controllers/gear");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//  @desc   Process add gear to the db
//  @route  POST /gear
// router.post("/gear", gearController.createGear);

//  @desc   Render the gear page and pull up wishlist'ed gear for the user
//  @route  GET /gear
router.get("/", gearController.getGear);

module.exports = router;
