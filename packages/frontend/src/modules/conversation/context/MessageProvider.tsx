import { MessageContext } from "./MessageContext";
import { useState } from "react";
import { AiResponseEntry } from "../../../types";
import { nanoid } from "nanoid";
import { useSendConversationMessage } from "../hooks/useSendConversationMessage";
import { Conversation } from "../types";

interface MessageProviderProps {
  conversation: Conversation;
  children: React.ReactNode;
}

export const MessageProvider = ({
  children,
  conversation,
}: MessageProviderProps) => {
  const [messages, setMessages] = useState<Array<AiResponseEntry>>(
    conversation.messages
  );

  const mutation = useSendConversationMessage((response) => {
    if ("error" in response) return;

    setMessages((s) =>
      s.concat(response.map((r) => ({ ...r, isResponse: true })))
    );
  });

  const addMessage = (message: string) => {
    setMessages((s) =>
      s.concat([
        {
          type: "paragraph",
          data: message,
          id: nanoid(),
          color: "black",
          title: "",
          isResponse: false,
        },
      ])
    );

    mutation.mutate({ conversationId: conversation.id, input: message });
  };

  return (
    <MessageContext.Provider
      value={{ messages, addMessage, isPending: mutation.isPending }}
    >
      {children}
    </MessageContext.Provider>
  );
};
