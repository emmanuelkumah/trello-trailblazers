const Expense = require("../../models/Expense");
const ExpenseComment = require("../../models/ExpenseComment");

const createExpenseComment = async (req, res) => {
  const { groupId, expenseId } = req.params;
  const { comment } = req.body;
  const userId = req.user;

  if (!groupId || !expenseId) {
    return res.status(400).json({
      status: "fail",
      message: "Group ID and Expense ID are required.",
    });
  }
  if (!comment && !req.file) {
    return res.status(400).json({
      status: "fail",
      message: "Comment or file is required.",
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
    // Check if the user is a member of the group
    const isMember = expense.participants.some(
      (participant) => participant.user.toString() === userId.toString()
    );
    if (!isMember) {
      return res.status(403).json({
        status: "fail",
        message: "You are not a member of this group.",
      });
    }

    // Handle file upload (assumes middleware like multer is used)
    let fileData = null;
    if (req.file) {
      const isImage = req.file.mimetype.startsWith("image/");
      fileData = {
        url: `/uploads/${req.file.filename}`,
        type: isImage ? "image" : "document",
        originalName: req.file.originalname,
      };
    }

    const newComment = await ExpenseComment.create({
      creator: userId,
      expense: expenseId,
      comment: comment || null,
      file: fileData,
    });

    //save the comment to the expense
    expense.comments.push(newComment._id);
    await expense.save();
    // Populate the comment with creator details
    const populatedComment = await ExpenseComment.findById(
      newComment._id
    ).populate("creator", "fullname email");
    // Send the populated comment as the response
    res.status(201).json({
      status: "success",
      data: populatedComment,
    });
  } catch (error) {
    console.error("Comment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = createExpenseComment;
