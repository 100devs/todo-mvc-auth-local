const express = require("express");
const router = express.Router();

const EntriesController = require("../controllers/entries");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", homeController.getIndex);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get('/dashboard', ensureAuth, EntriesController.getEntries);
router.get('/entry', (req, res) => {
    res.render('entry')
})
module.exports = router;
