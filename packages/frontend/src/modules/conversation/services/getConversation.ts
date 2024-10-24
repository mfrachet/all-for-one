import { Conversation } from "../types";

export const getConversation = async (
  conversationId: string
): Promise<Conversation> => {
  const response = await fetch(
    `http://localhost:3000/conversations/${conversationId}`
  );

  return response.json();
};
