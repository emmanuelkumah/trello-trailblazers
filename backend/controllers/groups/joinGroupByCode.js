const Group = require("../../models/Group");
const User = require("../../models/User");

const joinGroupByCode = async (req, res) => {
  try {
    const { code } = req.body;
    const user = req.user;

    if (!code) {
      return res
        .status(400)
        .json({ status: "fail", message: "Group code is required." });
    }

    const group = await Group.findOne({ code });

    if (!group) {
      return res
        .status(404)
        .json({ status: "fail", message: "Group not found." });
    }

    // Prevent creator from "joining" their own group
    if (group.creator.toString() === user.toString()) {
      return res.status(400).json({
        status: "fail",
        message: "You are the creator of this group.",
      });
    }

    // Check if already a member
    const isMember = group.members.some(
      (memberId) => memberId.toString() === user.toString()
    );

    if (isMember) {
      return res.status(400).json({
        status: "fail",
        message: "You are already a member of this group.",
      });
    }

    // Add user to group members
    group.members.push(user);
    await group.save();

    // Adding the group to the user's list of groups
    await User.findByIdAndUpdate(user, {
      $addToSet: { groups: group.id },
    });

    return res.status(200).json({
      status: "success",
      message: "Successfully joined group.",
      group,
    });
  } catch (error) {
    console.error("Join group error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = joinGroupByCode;
