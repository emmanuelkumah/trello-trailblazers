const Group = require("../../models/Group");
const { sanitizeDoc } = require("../../lib/helpers");

const updateGroup = async (req, res) => {
  try {
    const groupId = req.params.id;

    const updates = {},
      allowedFields = ["name", "description", "image"];

    const isValidUpdate = Object.keys(req.body).every((field) =>
      allowedFields.includes(field)
    );

    if (!isValidUpdate) {
      return res.status(400).json({
        status: "fail",
        message: `Invalid field(s) for update: '${Object.keys(req.body).join(
          ", "
        )}'`,
      });
    }

    allowedFields.forEach((field) => {
      if (req.body[field]) {
        updates[field] = req.body[field].trim?.() || req.body[field];
      }
    });

    const group = await Group.findByIdAndUpdate(groupId, updates, {
      new: true,
      runValidators: true,
    });

    if (!group) {
      return res.status(404).json({
        status: "fail",
        message: "Group not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Group updated successfully",
      data: sanitizeDoc(group),
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = updateGroup;
