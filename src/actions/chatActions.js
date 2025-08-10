const allServices = require("../services/instances");

exports.createConversationAction = async ({ user2Id, name, token }) => {
  const { data } = await allServices.chatService.post(
    "/api/conversations/create",
    { user2Id, name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

exports.getAllConversationsActon = async ({ userId, queries }) => {
  const { data } = await allServices.chatService.get(
    `/api/conversations/${userId}`,
    {
      params: queries,
    }
  );
  return data;
};

exports.getMessagesActions = async ({ conversationId, token, queries }) => {
  const { data } = await allServices.chatService.get(
    `/api/messages/${conversationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: queries,
    }
  );
  return data;
};
