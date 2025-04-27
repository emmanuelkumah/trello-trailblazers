const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const expenseController = require("../controllers/expenses");
const expenseCommentController = require("../controllers/expenseComments");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router
  .get("/:groupId", authMiddleware, expenseController.getGroupExpenses)
  .get(
    "/:groupId/expenses/:expenseId",
    authMiddleware,
    expenseController.getExpense
  )
  .post("/:groupId", authMiddleware, expenseController.createExpense)
  .patch(
    "/:groupId/expenses/:expenseId/settle",
    authMiddleware,
    expenseController.settleExpense
  )
  .delete(
    "/:groupId/expenses/:expenseId",
    authMiddleware,
    expenseController.deleteExpense
  )
  // comment
  .post(
    "/:groupId/expenses/:expenseId/comments",
    authMiddleware,
    upload.single("file"),
    expenseCommentController.createExpenseComment
  )
  .delete(
    "/:groupId/expenses/:expenseId/comments/:commentId",
    authMiddleware,
    expenseCommentController.deleteExpenseComment
  );

module.exports = router;
