const Group = require("../../models/Group");
const { sanitizeDoc } = require("../../lib/helpers");

const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find({}).populate("members", "fullname email");

    if (!groups || groups.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No groups found",
      });
    }

    res.status(200).json({
      status: "success",
      results: groups.length,
      data: groups.map((group) => sanitizeDoc(group)),
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = getAllGroups;
