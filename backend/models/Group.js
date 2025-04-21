const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: [true, "A group must have a creator."],
  },
  name: {
    type: String,
    required: [true, "A group must have a name/title."],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "A group must have some description."],
  },
  code: String,
  slug: String,
  image: {
    type: String,
    required: [true, "Add an image for your group."],
  },
  members: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Groups", GroupSchema);
