import { useMutation } from "@tanstack/react-query";
import { sendConversationMessage } from "../services/sendConversationMessage";
import { ConversationResponse } from "../types";

export const useSendConversationMessage = (
  conversationId: string,
  onSuccess?: (response: ConversationResponse[]) => void
) => {
  const mutation = useMutation({
    mutationFn: (input: string) =>
      sendConversationMessage(conversationId, input),
    onSuccess(data) {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });

  return mutation;
};
