const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const gearController = requrie("../controllers/gear");
const homeController = require("../controllers/home");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//  @desc   Process add gear
//  @route  POST /gear
router.post("/gear", authController.postGear);

module.exports = router;
