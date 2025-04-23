const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const expenseController = require("../controllers/expenses");

const router = express.Router();

router
  .get("/:groupId/expenses", authMiddleware, expenseController.getGroupExpenses)
  .post("/:groupId", authMiddleware, expenseController.createExpense);

module.exports = router;
