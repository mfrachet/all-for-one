import { Suggestion } from "../types";

export const getSuggestions = async (): Promise<Array<Suggestion>> => {
  const response = await fetch(`http://localhost:3000/charts/suggestions`);

  const suggestions = (await response.json()) as Array<Suggestion>;

  return suggestions;
};
