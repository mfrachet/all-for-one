import { Suggestion, SuggestionDict } from "../types";

export const getSuggestions = async (): Promise<SuggestionDict> => {
  const response = await fetch(`http://localhost:3000/charts/suggestions`);

  const suggestions = (await response.json()) as Array<Suggestion>;

  const suggestionParagraphs = suggestions.filter(
    (s) => s.type === "paragraph"
  );
  const suggestionLineCharts = suggestions.filter(
    (s) => s.type === "lineChart"
  );
  const suggestionPieCharts = suggestions.filter((s) => s.type === "pieChart");

  return {
    paragraph: suggestionParagraphs,
    lineChart: suggestionLineCharts,
    pieChart: suggestionPieCharts,
  };
};
