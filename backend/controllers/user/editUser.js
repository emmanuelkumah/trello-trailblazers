// Edit user details
const { sanitizeDoc } = require("../../lib/helpers");
const User = require("../../models/User");

// PATCH /api/users/:id
const editUser = async (req, res) => {
  const allowedUpdates = [
    "fullname",
    "profileImage",
    "phone_number",
    "country",
    "state",
    "email",
  ];
  const updates = {};
  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      message: "User details successfully updated",
      data: sanitizeDoc(user),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = editUser;
