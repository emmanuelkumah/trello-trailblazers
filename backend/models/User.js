const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: [true, "Please add a phone number"] },
  country: { type: String, required: [true, "Please add a country"] },
  state: { type: String, required: [true, "Please add a state"] },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Groups" }],
});

module.exports = mongoose.model("User", UserSchema);
