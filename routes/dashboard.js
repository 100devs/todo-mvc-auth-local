const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const dashboardController = require("../controllers/dashboard");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc    Render the dashboard
// @route   GET /
router.get("/", ensureAuth, dashboardController.showDashboard);

// @desc    Render the public wishlist
// @route   GET /publicWishlist
router.get(
  "/publicWishlist",
  ensureAuth,
  dashboardController.showPublicWishlist
);

// @desc    Render the private wishlist
// @route   GET /privateWishlist
router.get(
  "/privateWishlist",
  ensureAuth,
  dashboardController.showPrivateWishlist
);

module.exports = router;
