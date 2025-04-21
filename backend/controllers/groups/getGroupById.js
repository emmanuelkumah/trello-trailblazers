const Group = require("../../models/Group");
const { sanitizeDoc } = require("../../lib/helpers");

const getGroupById = async (req, res) => {
  try {
    const groupId = req.params.id;

    const group = await Group.findById(groupId).populate(
      "members",
      "fullname email"
    );

    if (!group) {
      return res.status(404).json({
        status: "fail",
        message: "Group not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: sanitizeDoc(group),
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = getGroupById;
