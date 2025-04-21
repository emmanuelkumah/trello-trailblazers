const { sanitizeDoc } = require("../../lib/helpers");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const register = async (req, res) => {
  try {
    const { fullname, phone_number, country, state, email, password } =
      req.body;
    let user = await User.findOne({ email });

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
