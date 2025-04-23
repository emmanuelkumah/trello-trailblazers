const Expense = require("../../models/Expense");

const getExpenseById = async (req, res) => {
  const { expenseId, groupId } = req.params;

  if (!expenseId || !groupId) {
    return res.status(400).json({
      status: "fail",
      message: "Expense ID and Group ID are required.",
    });
  }

  try {
    const expense = await Expense.findOne({ _id: expenseId, groupId })
      .populate("creator", "fullname email")
      .populate("participants.user", "fullname email")
      .populate("comments", "comment file creator")
      .populate("comments.creator", "fullname email");

    if (!expense) {
      return res.status(404).json({
        status: "fail",
        message: "Expense not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = getExpenseById;
