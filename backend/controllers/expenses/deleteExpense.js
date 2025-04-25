const Expense = require("../../models/Expense");

const deleteExpense = async (req, res) => {
  const expenseId = req.params.expenseId;
  const groupId = req.params.groupId;
  const user = req.user;

  if (!expenseId || !groupId) {
    return res.status(400).json({
      status: "fail",
      message: "Expense ID and Group ID are required.",
    });
  }

  try {
    // Find the expense by ID and group ID
    const expense = await Expense.findOne({ _id: expenseId, groupId });

    if (!expense) {
      return res.status(404).json({
        status: "fail",
        message: "Expense not found.",
      });
    }

    if (expense.creator.toString() !== user.toString()) {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized to delete this expense.",
      });
    }

    // Delete the expense
    await Expense.deleteOne({ _id: expenseId });

    res.status(204).json({
      status: "success",
      message: "Expense deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = deleteExpense;
