require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/auth", require("./routes/OTPRoutes"));
app.use("/api", require("./routes/groupRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
