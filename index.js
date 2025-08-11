require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const healthProfileRoutes = require("./src/routes/userHealthProfileRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const otpRoutes = require('./src/routes/otpRoutes');

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is healthy!" });
});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/healthProfile", healthProfileRoutes);
app.use("/api/chat", chatRoutes);
app.use('/api/otp', otpRoutes);

// Connect to DB
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();