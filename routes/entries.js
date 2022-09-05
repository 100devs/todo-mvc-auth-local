const express = require("express");
const router = express.Router();
const EntriesController = require("../controllers/entries");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, EntriesController.getTodos);

router.post("/createEntry", EntriesController.createEntry);

router.put("/markComplete", EntriesController.markComplete);

router.put("/markIncomplete", EntriesController.markIncomplete);

router.delete("/deleteTodo", EntriesController.deleteTodo);

module.exports = router;
