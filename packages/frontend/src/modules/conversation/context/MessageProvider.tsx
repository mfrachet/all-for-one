import { MessageContext } from "./MessageContext";
import { useState } from "react";
import { AiResponseEntry } from "../../../types";
import { nanoid } from "nanoid";
import { useSendConversationMessage } from "../hooks/useSendConversationMessage";

interface MessageProviderProps {
  conversationId: string;
  children: React.ReactNode;
}

export const MessageProvider = ({
  children,
  conversationId,
}: MessageProviderProps) => {
  const [messages, setMessages] = useState<Array<AiResponseEntry>>([]);
  const mutation = useSendConversationMessage((response) => {
    if ("error" in response) return;

    setMessages((s) =>
      s.concat(response.map((r) => ({ ...r, isResponse: true })))
    );
  });

  const addMessage = (message: string) => {
    setMessages((s) =>
      s.concat([{ type: "paragraph", data: message, id: nanoid() }])
    );

    mutation.mutate({ conversationId, input: message });
  };

  return (
    <MessageContext.Provider
      value={{ messages, addMessage, isPending: mutation.isPending }}
    >
      {children}
    </MessageContext.Provider>
  );
};
