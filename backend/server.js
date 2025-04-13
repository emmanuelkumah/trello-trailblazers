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
    origin: "http://localhost:5173",
    // origin: "*",
    credentials: true,
  })
); // Frontend URL
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
