// Get user by ID
const { sanitizeDoc } = require("../../lib/helpers");
const User = require("../../models/User");

// GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "groups",
      "name description image"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      data: sanitizeDoc(user),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getUserById;
