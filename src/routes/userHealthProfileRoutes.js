const express = require("express");
const { getUserDetails } = require("../middleware/getUserDetails");
const { createUserHealthProfile, getUserHealthProfile, updateUserHealthProfile } = require("../controllers/userHealthProfileCntr");

const router = express.Router();

router.post("/create", getUserDetails, createUserHealthProfile);
router.post("/update", getUserDetails, updateUserHealthProfile);
router.get("/get-profile", getUserDetails, getUserHealthProfile);

module.exports = router;
