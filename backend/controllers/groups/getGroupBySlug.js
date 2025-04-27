const { sanitizeDoc } = require("../../lib/helpers");
const Group = require("../../models/Group");

const getGroupBySlug = async (req, res) => {
  try {
    const groupSlug = req.params.slug;

    const group = await Group.findOne({ slug: groupSlug }).populate(
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

module.exports = getGroupBySlug;
