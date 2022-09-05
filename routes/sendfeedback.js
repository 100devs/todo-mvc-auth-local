const express = require("express");
const router = express.Router();
const sendfeedbackController = require("../controllers/sendfeedback");
// const { ensureAuth } = require('../middleware/auth')

// @desc    Show sendfeedback page
// @route   GET /sendfeedback/
router.get("/", sendfeedbackController.getSendfeedback);

// @desc    Process sendfeedback form
// @route   POST /sendfeedback/
router.post("/", sendfeedbackController.createSendfeedback);

// @desc    Delete sendfeedback entry
// @route   DELETE /sendfeedback/
router.delete("/", sendfeedbackController.deleteSendfeedback);

module.exports = router;
