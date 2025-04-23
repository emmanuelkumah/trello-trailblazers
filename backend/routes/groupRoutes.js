const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const groupController = require("../controllers/groups");
const joinGroupByCode = require("../controllers/groups/joinGroupByCode");

const router = express.Router();

router
  .get("/", authMiddleware, groupController.getAllGroups)
  .get("/:id", authMiddleware, groupController.getGroupById)
  .get("/slug/:slug", authMiddleware, groupController.getGroupBySlug)
  .get("/code/:code", authMiddleware, groupController.getGroupByCode)
  .post("/", authMiddleware, groupController.createGroup)
  .post("/join", authMiddleware, joinGroupByCode)
  .patch("/:id", authMiddleware, groupController.updateGroup)
  .delete("/:id", authMiddleware, groupController.deleteGroup);

module.exports = router;
