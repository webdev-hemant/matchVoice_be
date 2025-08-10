const { getUsersByIds } = require("../actions/authActions");
const {
  getAllConversationsActon,
  getMessagesActions,
  createConversationAction,
} = require("../actions/chatActions");
const { extractToken } = require("../utils");

exports.createConversation = async (req, res) => {
  try {
    const { user2Id, name } = req.body;
    if (!user2Id) throw new Error("user2Id is required!");
    const token = extractToken(req);
    const data = await createConversationAction({ user2Id, name, token });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(
      error.response.data || {
        message: error.message || "Internal server error",
      }
    );
  }
};

exports.getAllConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const userFullName = `${req.user.firstName} ${req.user.lastName}`;
    const user1Avatar = "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350";
    const user2Avatar = "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350";
    
    // Fetch conversations
    const { data: conversations } = await getAllConversationsActon({
      userId,
      queries: req.query,
    });

    // Extract unique user IDs and map conversation IDs to users
    const uniqueUserIds = new Set();
    const conversationsMap = new Map();

    conversations.forEach(({ user1Id, user2Id, id }) => {
      const otherUserId = user1Id === userId ? user2Id : user1Id;
      uniqueUserIds.add(otherUserId);
      conversationsMap.set(id, { conId: id, userId: otherUserId });
    });

    // Fetch user details
    const users = await getUsersByIds([...uniqueUserIds]);
    const userDetailsMap = Object.fromEntries(
      users.map((user) => [user.id, user])
    );

    // Function to format messages with user details
    const formatMessages = (messages, userDetail) => {
      return messages.map((message) => {
        const formattedMessage = {
          ...message,
          message: message.content,
          name: message.senderId === userId ? userFullName : `${userDetail?.firstName} ${userDetail?.lastName}`,
          avatar: message.senderId === userId ? user1Avatar : user2Avatar
        };
        delete formattedMessage.content;
        return formattedMessage;
      });
    };

    // Enrich conversations with user details and formatted messages
    const enrichedConversations = conversations
      .map((convo) => {
        const userDetail = userDetailsMap[conversationsMap.get(convo.id)?.userId];
        if (!userDetail) return null;

        const { Messages, name, ...restConvo } = convo;
        const formattedMessages = Messages ? formatMessages(Messages, userDetail) : [];

        return {
          ...restConvo,
          name:`${userDetail.firstName} ${userDetail.lastName}`,
          avatar: "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
          messages: formattedMessages,
          userDetails: userDetail,
        };
      })
      .filter(Boolean);

    res.status(200).json(enrichedConversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.response?.data || error.message || "Internal server error",
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const token = extractToken(req);
    const response = await getMessagesActions({
      conversationId,
      token,
      queries: req.query,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(
      error.response.data || {
        message: error.message || "Internal server error",
      }
    );
  }
};
