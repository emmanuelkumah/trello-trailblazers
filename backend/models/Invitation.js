const mongoose = require("mongoose");

const InvitationSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  inviter: {
    type: String,
    required: true,
  },
  inviteeEmail: {
    type: String,
    required: true,
  },
  inviteeUser: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  inviteToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
