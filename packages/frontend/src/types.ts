type LineChartOutput = {
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
  type: "paragraph";
  data: string;
};

type PieChartOutput = {
  type: "pieChart";
  data: Array<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
};

type OutputEntry = LineChartOutput | ParagraphOutput | PieChartOutput;

export type MessageEntry = OutputEntry & { isResponse?: boolean };
