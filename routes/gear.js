const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const gearController = require("../controllers/gear");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//  @desc   Process add gear to the db
//  @route  POST /gearCreate
router.post("/createGear", gearController.createGear);

//  @desc   Render the gear page and pull up wishlist'ed gear for the user
//  @route  GET /
router.get("/", ensureAuth, gearController.getGear);

//  @desc   Display test page to display gear
//  @route  GET /show
router.get("/show", gearController.showGear);

module.exports = router;
