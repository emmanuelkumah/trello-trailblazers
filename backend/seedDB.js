require("dotenv").config();
const connectDB = require("./config/db");
const Group = require("./models/Group");

// Connect to Database
connectDB();

const clearDB = async () => {
  await Group.deleteMany({});
};

clearDB();
