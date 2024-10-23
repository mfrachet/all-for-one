import { SuggestionDict } from "../types";
import { SuggestionsContext } from "./SuggestionsContext";

export interface SuggestionsProviderProps {
  suggestions: Promise<SuggestionDict>;
  children: React.ReactNode;
}

export const SuggestionsProvider = ({
  suggestions,
  children,
}: SuggestionsProviderProps) => {
  return (
    <SuggestionsContext.Provider value={suggestions}>
      {children}
    </SuggestionsContext.Provider>
  );
};
