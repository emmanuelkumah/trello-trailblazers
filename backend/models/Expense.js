const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Who is creating this expense?"],
  },
  title: {
    type: String,
    required: [true, "An expense must have a title."],
    unique: true,
  },
  totalAmount: {
    type: Number,
    required: [true, "How much do you plan to spend?"],
    default: 0,
  },
  splitMethod: {
    type: String,
    enum: ["equal", "percentage", "manual"],
    default: "equal",
    required: [true, "How do you want to split the bill?"],
  },
  participants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      amountOwed: { type: Number, default: 0 },
    },
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now() },
    },
  ],
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: [true, "An expense must belong to a group."],
  },
  status: {
    type: String,
    enum: ["pending", "settled"],
    default: "pending",
    required: [true, "An expense must have a status."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Expenses", ExpenseSchema);

/*
[
    {
        "creator": "60d0fe4f5311236168a109ca",
        "title": "Dinner at Italian Bistro",
        "totalAmount": 120,
        "splitMethod": "equal",
        "participants": [
            { "user": "60d0fe4f5311236168a109ca", "amountOwed": 40 },
            { "user": "60d0fe4f5311236168a109cb", "amountOwed": 40 },
            { "user": "60d0fe4f5311236168a109cc", "amountOwed": 40 }
        ],
        "comments": [
            {
                "user": "60d0fe4f5311236168a109cb",
                "comment": "Great dinner, thanks for organizing!",
                "createdAt": "2024-06-01T19:30:00Z"
            }
        ],
        "groupId": "60d0fe4f5311236168a109cd",
        "status": "pending",
        "createdAt": "2024-06-01T19:00:00Z"
    },
    {
        "creator": "60d0fe4f5311236168a109cb",
        "title": "Movie Night Snacks",
        "totalAmount": 45,
        "splitMethod": "manual",
        "participants": [
            { "user": "60d0fe4f5311236168a109cb", "amountOwed": 15 },
            { "user": "60d0fe4f5311236168a109cc", "amountOwed": 10 },
            { "user": "60d0fe4f5311236168a109ca", "amountOwed": 20 }
        ],
        "comments": [],
        "groupId": "60d0fe4f5311236168a109cd",
        "status": "settled",
        "createdAt": "2024-06-02T21:00:00Z"
    }
]
*/
