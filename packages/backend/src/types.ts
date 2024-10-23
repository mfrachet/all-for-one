export type AiContext = Array<{
  role: "user" | "assistant";
  content: string;
}>;

// Keep this and copy paste it in the prompt
export type LineChartOutput = {
  id: string;
  type: "lineChart";
  data: Array<{
    id: string;
    color: string;
    data: Array<{
      x: number | string | Date;
      y: number;
    }>;
  }>;
};

export type ParagraphOutput = {
  id: string;
  type: "paragraph";
  data: string;
};

export type PieChartOutput = {
  id: string;
  type: "pieChart";
  data: Array<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
};

export type FormattedResponse =
  | LineChartOutput
  | ParagraphOutput
  | PieChartOutput;

export type ExpectedOutput = FormattedResponse[];

export type PersistentChart = {
  id: string;
  title: string;
  sqlQuery: string;
  type: "lineChart" | "pieChart" | "paragraph";
};
