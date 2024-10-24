import { useSuggestionsQuery } from "../hooks/useSuggestionsQuery";
import { SuggestionsContext } from "./SuggestionsContext";

export interface SuggestionsProviderProps {
  children: React.ReactNode;
}

export const SuggestionsProvider = ({ children }: SuggestionsProviderProps) => {
  const suggestionsQuery = useSuggestionsQuery();

  return (
    <SuggestionsContext.Provider
      value={{
        refetch: suggestionsQuery.refetch,
        suggestions: suggestionsQuery.data ?? [],
        isLoading: suggestionsQuery.isFetching,
      }}
    >
      {children}
    </SuggestionsContext.Provider>
  );
};
