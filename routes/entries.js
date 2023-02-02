const express = require("express");
const router = express.Router();
const EntriesController = require("../controllers/entries");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, EntriesController.getEntries);

router.post("/", ensureAuth, EntriesController.createEntry);

// router.delete("/", EntriesController.deleteTodo);

module.exports = router; 
