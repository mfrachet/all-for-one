import { useMutation } from "@tanstack/react-query";
import { sendConversationMessage } from "../services/sendConversationMessage";
import { ConversationResponse } from "../types";

export const useSendConversationMessage = (
  onSuccess?: (response: ConversationResponse[]) => void
) => {
  const mutation = useMutation({
    mutationFn: ({
      conversationId,
      input,
    }: {
      conversationId: string;
      input: string;
    }) => sendConversationMessage(conversationId, input),
    onSuccess(data) {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });

  return mutation;
};
