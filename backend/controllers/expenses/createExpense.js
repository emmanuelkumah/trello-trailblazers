const Expense = require("../../models/Expense");
const Group = require("../../models/Group");

const createExpense = async (req, res) => {
  const {
    title,
    totalAmount,
    splitMethod,
    participants,
    status,
    comments = [],
  } = req.body;
  const creatorId = req.user;
  const groupId = req.params.groupId;

  if (!title || !totalAmount || !groupId) {
    return res.status(400).json({
      status: "fail",
      message: "Title, total amount, and group ID are required.",
    });
  }

  try {
    const targetGroup = await Group.findOne({ _id: groupId });
    if (!targetGroup) {
      return res.status(404).json({
        status: "fail",
        message: "Group not found.",
      });
    }

    // Check if participants are members of the group
    const invalidParticipants = participants.filter(
      (participant) =>
        !targetGroup.members.some(
          (memberId) => memberId.toString() === participant.user.toString()
        )
    );
    if (invalidParticipants.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: "Some participants are not members of this group.",
      });
    }

    // Check if the user is a member of the group
    const isMember = targetGroup.members.some(
      (memberId) => memberId.toString() === creatorId.toString()
    );
    if (!isMember) {
      return res.status(403).json({
        status: "fail",
        message: "You are not a member of this group.",
      });
    }

    const expense = await Expense.create({
      title: title,
      creator: creatorId,
      totalAmount: totalAmount,
      splitMethod: splitMethod,
      groupId: groupId,
      participants: participants,
      status: status,
      comments: comments,
    });

    // Add the expense to the group
    await Group.findByIdAndUpdate(groupId, {
      $push: { expenses: expense._id },
    });

    res.status(201).json({
      status: "success",
      data: {
        expense,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "fail", message: error.message || "Server error" });
  }
};

module.exports = createExpense;
