import { createContext } from "react";

import { Suggestion } from "../types";

export const SuggestionsContext = createContext<{
  suggestions: Suggestion[];
  isLoading: boolean;
}>({ suggestions: [], isLoading: false });
