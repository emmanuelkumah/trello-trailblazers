const { sanitizeDoc } = require("../../lib/helpers");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const transporter = require("../../config/mailer");

const register = async (req, res) => {
  try {
    const { fullname, phone_number, country, state, email, password } =
      req.body;
    let user = await User.findOne({ email }).populate(
      "groups",
      "name description image"
    );

    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      fullname,
      phone_number,
      country,
      state,
      email,
      password: hashedPassword,
    });
    await user.save();

    await transporter.sendMail({
      to: email,
      from: '"noreply" <noreply@divvy.com>',
      subject: "Welcome to Divvy!",
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #FFF8F0; padding: 20px;">
      <div style="max-width: 500px; margin: auto; background: #FFFFFF; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(45,45,45,0.1);">
        <h2 style="color: #FF6B6B; text-align: center; margin: 6px 0;">🎉 Welcome Aboard!</h2>
        <p style="font-size: 16px; color: #2D2D2D;">
          Hello <strong>${fullname.split(" ")[0] || fullname}</strong>,
        </p>
        <p style="font-size: 16px; color: #2D2D2D;">
          Thank you for registering with us! We're truly excited to have you use our solution. Our goal is to make sure you have the best experience possible.
        </p>
        <p style="font-size: 16px; color: #2D2D2D;">
          If you ever have any questions, feedback, or need assistance, we're just an email away.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://divvy-yu6y.onrender.com/" target="_blank" style="display: inline-block; background-color: #62D2A2; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            Go to Dashboard
          </a>
        </div>
        <p style="text-align: center; font-size: 14px; color: #EAEAEA; margin-top: 30px;">
          — The Divvy Team
        </p>
      </div>
    </div>
  `,
    });

    // Return sanitized user data
    res.status(201).json({
      message: "User registered successfully",
      user: sanitizeDoc(user),
    });
  } catch (error) {
    // console.error("Register error:", error); // Log for debugging
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = register;
