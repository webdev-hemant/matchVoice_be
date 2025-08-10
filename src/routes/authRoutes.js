const express = require("express");
const {
  register,
  login,
  getAllUsers,
  getUserDetailsCntr,
  sendOtpForLoginCntr,
  verifyOtpForLoginCntr,
} = require("../controllers/authController");
const { getUserDetails } = require("../middleware/getUserDetails");

const router = express.Router();

router.get("/getAllUsers", getAllUsers);

router.post("/register", register);
router.post("/login", login);
router.post("/sendOtpForLogin", sendOtpForLoginCntr);
router.post("/verifyOtpForLogin", verifyOtpForLoginCntr);
router.get("/getUserDetails", getUserDetails, getUserDetailsCntr);

module.exports = router;
