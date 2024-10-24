import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "../services/getSuggestions";

export const useSuggestionsQuery = () => {
  return useQuery({
    queryKey: ["suggestions"],
    queryFn: () => getSuggestions(),
  });
};
