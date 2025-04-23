const Expense = require("../../models/Expense");

const getGroupExpenses = async (req, res) => {
  const groupId = req.params.groupId;

  if (!groupId) {
    return res.status(400).json({
      status: "fail",
      message: "Group ID is required.",
    });
  }

  try {
    const expenses = await Expense.find({ groupId })
      .populate("creator", "fullname email")
      .populate("participants.user", "fullname email");

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Your group does not have an expense yet.",
      });
    }

    res.status(200).json({
      status: "success",
      results: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = getGroupExpenses;
