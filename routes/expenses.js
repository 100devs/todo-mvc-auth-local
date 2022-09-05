const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenses");
const { ensureAuth } = require("../middleware/auth");

// router.get("/", ensureAuth, budgetController.getBudget);

router.post("/create", expenseController.createExpense);

router.delete("/delete", expenseController.deleteExpense);

router.put("/update/:id", expenseController.updateExpense); // send the id of expense to update as a URL parameter

// router.put("/markComplete", todosController.markComplete);

// router.put("/markIncomplete", todosController.markIncomplete);

// router.delete("/deleteTodo", todosController.deleteTodo);

module.exports = router;
