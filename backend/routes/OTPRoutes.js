const express = require("express");
const {
  requestResetOTP,
  verifyResetOTP,
  resetPassword,
} = require("../controllers/auth");
const router = express.Router();

router.post("/request-reset-otp", requestResetOTP);
router.post("/verify-reset-otp", verifyResetOTP);
router.post("/reset-password", resetPassword);

module.exports = router;
