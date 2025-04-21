const express = require("express");
const {
  requestResetOTP,
  verifyResetOTP,
  resetPassword,
} = require("../controllers/auth");
const router = express.Router();

router.post("/otp/request-reset-otp", requestResetOTP);
router.post("/otp/verify-reset-otp", verifyResetOTP);
router.post("/otp/reset-password", resetPassword);

module.exports = router;
