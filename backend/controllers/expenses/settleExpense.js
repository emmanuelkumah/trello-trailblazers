const Expense = require("../../models/Expense");

const settleExpense = async (req, res) => {
  const { groupId, expenseId } = req.params;
  const { paymentAmount } = req.body;
  const userId = req.user;

  if (!paymentAmount || paymentAmount <= 0) {
    return res.status(400).json({
      status: "fail",
      message: "Valid payment amount is required.",
    });
  }

  try {
    const expense = await Expense.findOne({ _id: expenseId, groupId });

    if (!expense) {
      return res.status(404).json({
        status: "fail",
        message: "Expense not found.",
      });
    }

    const participant = expense.participants.find(
      (p) => p.user.toString() === userId.toString()
    );

    if (!participant) {
      return res.status(403).json({
        status: "fail",
        message: "You are not a participant in this expense.",
      });
    }

    if (participant.hasSettled) {
      return res.status(400).json({
        status: "fail",
        message: "You have already settled your payment.",
      });
    }

    if (paymentAmount > participant.amountOwed) {
      return res.status(400).json({
        status: "fail",
        message: `You cannot pay more than your owed amount (${participant.amountOwed}).`,
      });
    }

    // Deduct the payment
    participant.amountOwed -= paymentAmount;

    // Check if user has completely settled
    if (participant.amountOwed === 0) {
      participant.hasSettled = true;
    }

    // If everyone has settled, mark the expense as settled
    const allSettled = expense.participants.every((p) => p.hasSettled);
    if (allSettled) {
      expense.status = "settled";
    }

    await expense.save();

    if (participant.hasSettled) {
      return res.status(200).json({
        status: "success",
        message: "You have successfully settled your payment.",
        data: expense,
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: `Partial payment successful. You still owe ${participant.amountOwed}.`,
        data: expense,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};

module.exports = settleExpense;
