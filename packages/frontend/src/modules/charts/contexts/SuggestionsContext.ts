import { createContext } from "react";

import { Suggestion } from "../types";

export const SuggestionsContext = createContext<{
  refetch: () => void;
  suggestions: Suggestion[];
  isLoading: boolean;
}>({ suggestions: [], isLoading: false, refetch: () => {} });
