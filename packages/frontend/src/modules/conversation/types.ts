type LineChartOutput = {
  id: string;
  type: "lineChart";
  data: Array<{
    id: string;
    color: string;
    data: Array<{
      x: number;
      y: number;
    }>;
  }>;
};

type ParagraphOutput = {
  id: string;
  type: "paragraph";
  data: string;
};

type PieChartOutput = {
  id: string;
  type: "pieChart";
  data: Array<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
};

export type ConversationResponse =
  | LineChartOutput
  | ParagraphOutput
  | PieChartOutput;
