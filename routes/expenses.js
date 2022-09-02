const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenses");
const { ensureAuth } = require("../middleware/auth");

// router.get("/", ensureAuth, budgetController.getBudget);

router.post("/create", expenseController.createExpense);

router.post("/delete", expenseController.deleteExpense);

// router.put("/markComplete", todosController.markComplete);

// router.put("/markIncomplete", todosController.markIncomplete);

// router.delete("/deleteTodo", todosController.deleteTodo);

module.exports = router;
