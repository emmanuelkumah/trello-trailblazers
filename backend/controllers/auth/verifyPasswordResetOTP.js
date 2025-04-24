const bcrypt = require("bcryptjs");
const OTP = require("../../models/OTP");
const { isExpired } = require("../../lib/helpers");

const verifyResetOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const tokenEntry = await OTP.findOne({ email });
    if (!tokenEntry) {
      return res
        .status(400)
        .json({ message: "No OTP found. Please request a new one." });
    }

    if (isExpired(tokenEntry.expiresAt)) {
      await OTP.deleteOne({ email });
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }

    const isMatch = await bcrypt.compare(otp, tokenEntry.otpHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid
    await OTP.deleteOne({ email }); // OTP is one-time use
    res
      .status(200)
      .json({ message: "OTP verified. You may now reset your password." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = verifyResetOTP;
