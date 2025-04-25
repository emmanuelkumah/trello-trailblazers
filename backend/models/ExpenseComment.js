const mongoose = require("mongoose");

const expenseCommentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    trim: true,
  },
  file: {
    url: String,
    type: {
      type: String,
      enum: ["image", "document", null], // null for text-only comments
    },
    originalName: String, // Optional: to keep original filename
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ExpenseComment", expenseCommentSchema);
