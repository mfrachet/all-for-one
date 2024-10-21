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

export type OutputEntry = LineChartOutput | ParagraphOutput;

export type MessageEntry = OutputEntry & { isResponse?: boolean };
