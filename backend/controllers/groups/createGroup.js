const Group = require("../../models/Group");
const { sanitizeDoc, generateGroupCodeAndSlug } = require("../../lib/helpers");

const createGroup = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const { code: groupCode, slug: groupSlug } = generateGroupCodeAndSlug(name);

    const group = new Group({
      creator: req.user,
      name: name.trim(),
      description: description.trim(),
      image: image,
      code: groupCode,
      slug: groupSlug,
      members: [req.user],
    });

    await group.save();

    res.status(201).json({
      status: "success",
      message: "Your group has been created successfully!",
      data: sanitizeDoc(group),
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = createGroup;
