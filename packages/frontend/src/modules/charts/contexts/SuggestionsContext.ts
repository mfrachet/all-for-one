import { createContext } from "react";
import { SuggestionDict } from "../types";

export const SuggestionsContext = createContext<Promise<SuggestionDict>>(
  Promise.resolve({
    lineChart: [],
    pieChart: [],
    paragraph: [],
  })
);
