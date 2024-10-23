import { useContext } from "react";
import { SuggestionsContext } from "./SuggestionsContext";

export const useSuggestions = () => {
  return useContext(SuggestionsContext);
};
