const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const groupController = require("../controllers/groups");

const router = express.Router();

router
  .get("/groups", authMiddleware, groupController.getAllGroups)
  .get("/groups/:id", authMiddleware, groupController.getGroupById)
  .get("/groups/slug/:slug", authMiddleware, groupController.getGroupBySlug)
  .get("/groups/code/:code", authMiddleware, groupController.getGroupByCode)
  .post("/groups", authMiddleware, groupController.createGroup)
  .patch("/groups/:id", authMiddleware, groupController.updateGroup)
  .delete("/groups/:id", authMiddleware, groupController.deleteGroup);

module.exports = router;
