import { useMutation } from "@tanstack/react-query";
import { requestData } from "../services/requestData";
import { OutputEntry } from "../types";

export const useRequestData = (
  onSuccess?: (response: OutputEntry[]) => void
) => {
  const mutation = useMutation({
    mutationFn: (input: string) => requestData(input),
    onSuccess(data) {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });

  return mutation;
};
