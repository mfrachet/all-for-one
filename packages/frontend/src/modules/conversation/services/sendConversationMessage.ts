export const sendConversationMessage = async (
  conversationId: string,
  input: string
) => {
  const response = await fetch(
    `http://localhost:3000/compute/${conversationId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    }
  );

  return response.json();
};
