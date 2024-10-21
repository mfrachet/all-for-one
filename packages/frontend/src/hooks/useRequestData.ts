import { useMutation } from "@tanstack/react-query";
import { requestData } from "../services/requestData";
import { OutputEntry } from "../types";

export const useRequestData = (
  conversationId: string,
  onSuccess?: (response: OutputEntry[]) => void
) => {
  const mutation = useMutation({
    mutationFn: (input: string) => requestData(conversationId, input),
    onSuccess(data) {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });

  return mutation;
};
