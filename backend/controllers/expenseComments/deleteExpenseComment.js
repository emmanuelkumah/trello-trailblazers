const Expense = require("../../models/Expense");

const deleteExpenseComment = async (req, res) => {
  const { expenseId, commentId } = req.params;
  const userId = req.user;

  if (!expenseId || !commentId) {
    return res.status(400).json({
      status: "fail",
      message: "Expense ID and comment ID are required.",
    });
  }

  try {
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({
        status: "fail",
        message: "Expense not found.",
      });
    }

    // Get the comment subdocument
    const comment = expense.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        status: "fail",
        message: "Comment not found.",
      });
    }

    // Check ownership
    if (comment.creator.toString() !== userId.toString()) {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized to delete this comment.",
      });
    }

    comment.remove();

    await expense.save();

    res.status(200).json({
      status: "success",
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message || "Something went wrong.",
    });
  }
};

module.exports = deleteExpenseComment;
