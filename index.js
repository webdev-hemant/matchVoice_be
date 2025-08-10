require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const healthProfileRoutes = require("./src/routes/userHealthProfileRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const otpRoutes = require('./src/routes/otpRoutes');
const { SERVER_PORT } = require("./src/config/allEnv");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is healthy!" });
})

app.use(express.json());

app.get("/", (req, res) => res.json({ message: "It's working!" }));

app.use("/api/auth", authRoutes);
app.use("/api/healthProfile", healthProfileRoutes);
app.use("/api/chat", chatRoutes);
app.use('/api/otp', otpRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: true }) // Create tables if they don't exist and update them if they do

    const PORT = SERVER_PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
