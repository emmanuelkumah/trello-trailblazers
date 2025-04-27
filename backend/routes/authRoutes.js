const express = require("express");
const { register, login, logout } = require("../controllers/auth");
const authMiddleware = require("../middleware/authMiddleware");
// const transporter = require("../config/mailer");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
// router.get("/test-mail", async (req, res) => {
//   try {
//     await transporter.sendMail({
//       from: `"Divvy" <noreply@divvy.com>`,
//       to: "geekbuddy33@gmail.com",
//       subject: "Welcome to Divvy!",

//       html: `<p>Hello from Divvy!</p>`,
//     });

//     res.send("Test email sent!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(`Failed to send test email: ${error.message}`);
//   }
// });

module.exports = router;
