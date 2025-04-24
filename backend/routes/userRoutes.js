const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/user");

const router = express.Router();

router
  .get("/:id", authMiddleware, userController.getUserById)
  .patch("/:id", authMiddleware, userController.editUser);

module.exports = router;
