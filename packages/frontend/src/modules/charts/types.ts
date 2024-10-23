export type Suggestion = {
  title: string;
  type: "lineChart" | "pieChart" | "paragraph";
};

export type SuggestionDict = {
  lineChart: Array<Suggestion>;
  pieChart: Array<Suggestion>;
  paragraph: Array<Suggestion>;
};
