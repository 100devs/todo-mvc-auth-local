const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budget");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, budgetController.getBudget);

router.post("/create", budgetController.createBudget);

router.put("/edit", budgetController.editBudget); // this may need to be a post request as well...

router.delete("/delete", budgetController.deleteBudget); //add trash can icon next to budget entries

// router.put("/markComplete", todosController.markComplete);

// router.put("/markIncomplete", todosController.markIncomplete);

// router.delete("/deleteTodo", todosController.deleteTodo);

module.exports = router;
