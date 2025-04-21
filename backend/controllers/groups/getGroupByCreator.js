const Group = require("../../models/Group");
const { sanitizeDoc } = require("../../lib/helpers");

const getGroupByCreator = async (req, res) => {
  try {
    const creatorId = req.user._id;

    const groups = await Group.find({ creator: creatorId }).populate(
      "members",
      "fullname email"
    );

    if (!groups || groups.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No groups found for this user",
      });
    }

    res.status(200).json({
      status: "success",
      data: groups.map((group) => sanitizeDoc(group)),
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = getGroupByCreator;
