const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const passport = require("passport");
const { ensureAuth, isAuthorized } = require("../middleware/auth");

//@desc Auth with Google
//@route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to companies page
    res.redirect("/companies");
  }
);
module.exports = router;
