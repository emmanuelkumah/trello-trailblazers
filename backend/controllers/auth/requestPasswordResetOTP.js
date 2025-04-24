const { hashOTP, generateOTP } = require("../../lib/helpers");
const OTP = require("../../models/OTP");
const transporter = require("../../config/mailer");
const User = require("../../models/User");

const requestResetOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Invalidate previous OTPs
    await OTP.deleteMany({ email });

    const otp = generateOTP();
    const hashedOtp = await hashOTP(otp);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await OTP.create({ email, otpHash: hashedOtp, expiresAt });

    // Send OTP via email
    await transporter.sendMail({
      to: email,
      from: `"noreply" <noreply@divvy.com>`,
      subject: "Your OTP for password reset",
      html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #333; text-align: center;">🔐 Password Reset Request</h2>
        <p style="font-size: 16px; color: #555;">
          Hello <strong>${user.fullname || user.email}</strong>,
        </p>
        <p style="font-size: 16px; color: #555;">
          We received a request to reset your password. Use the following One-Time Password (OTP) to continue:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; letter-spacing: 4px; font-weight: bold; background: #f0f0f0; padding: 12px 24px; border-radius: 6px; display: inline-block;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #888;">
          This OTP is valid for 10 minutes. If you didn’t request this, you can safely ignore this email.
        </p>
        <p style="text-align: center; font-size: 14px; color: #aaa; margin-top: 30px;">
          — The Divvy Team
        </p>
      </div>
    </div>`,
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = requestResetOTP;
