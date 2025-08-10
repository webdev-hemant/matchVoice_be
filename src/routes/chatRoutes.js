const express = require("express");
const {
  getAllConversations,
  getMessages,
  createConversation,
} = require("../controllers/chatController");
const { getUserDetails } = require("../middleware/getUserDetails");

const router = express.Router();

router.post("/createConversation", createConversation);

router.get("/getAllConversations", getUserDetails, getAllConversations);

router.get("/getMessages/:conversationId", getMessages);

module.exports = router;
