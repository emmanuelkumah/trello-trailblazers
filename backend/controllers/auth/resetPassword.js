const bycrypt = require("bcryptjs");
const User = require("../../models/User");
const OTP = require("../../models/OTP");

const resetPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const otpRecord = await OTP.findOne({ email });

    if (otpRecord) {
      // This means the user has not verified their OTP, because the OTP record still exists
      return res.status(403).json({
        message: "You need to verify your OTP before resetting your password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // const checkOTP = await OTP.findOne({ email });
    // if (checkOTP)

    const saltRounds = 10;
    const hashedPassword = await bycrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    await user.save();

    // Delete the OTP record after successful password reset
    await OTP.deleteOne({ email });

    res
      .status(200)
      .json({ message: "Password reset successfully. Login again!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = resetPassword;
