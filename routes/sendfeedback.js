const express = require("express");
const router = express.Router();
const sendfeedbackController = require("../controllers/sendfeedback");
const { modalAuth } = require("../middleware/modalAuth");

// @desc    Show sendfeedback page
// @route   GET /sendfeedback/
router.get("/", modalAuth, sendfeedbackController.getSendfeedback);

// @desc    Process sendfeedback form
// @route   POST /sendfeedback/
router.post("/", sendfeedbackController.createSendfeedback);

// @desc    Delete sendfeedback entry
// @route   DELETE /sendfeedback/
router.delete("/", modalAuth, sendfeedbackController.deleteSendfeedback);

// Auth Sub Routes

// @desc    Login sendfeedback
// @route   GET /sendfeedback/login
router.get("/login", sendfeedbackController.getLogin);

// @desc    Login sendfeedback
// @route   POST /sendfeedback/login
router.post("/login", sendfeedbackController.postLogin);

// @desc    Login sendfeedback
// @route   GET /sendfeedback/login
router.get("/logout", sendfeedbackController.logout);

// @desc    Sign Up sendfeedback
// @route   GET /sendfeedback/signup
router.get("/signup", sendfeedbackController.getSignup);

// @desc    Sign Up sendfeedback
// @route   POST /sendfeedback/signup
router.post("/signup", sendfeedbackController.postSignup);

module.exports = router;
