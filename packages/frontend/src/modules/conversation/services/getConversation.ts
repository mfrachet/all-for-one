export const getConversation = async (conversationId: string) => {
  const response = await fetch(
    `http://localhost:3000/conversations/${conversationId}`
  );

  return response.json();
};
