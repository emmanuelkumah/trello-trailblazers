const mongoose = require("mongoose");
const Group = require("../../models/Group");

const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.id;

    // Check if groupId is valid
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid group ID format",
      });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({
        status: "fail",
        message: "Group not found",
      });
    }

    if (!req.user || req.user !== group.creator) {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized to delete this group",
      });
    }

    const deletedGroup = await Group.findByIdAndDelete(groupId);
    if (!deletedGroup) {
      return res.status(404).json({
        status: "fail",
        message: "Group not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Group deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
module.exports = deleteGroup;
