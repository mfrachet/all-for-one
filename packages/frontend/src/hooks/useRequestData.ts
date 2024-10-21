import { useMutation } from "@tanstack/react-query";
import { requestData } from "../services/requestData";

export const useRequestData = () => {
  const mutation = useMutation({
    mutationFn: (input: string) => requestData(input),
  });

  return mutation;
};
