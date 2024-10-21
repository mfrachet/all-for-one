// Keep this and copy paste it in the prompt
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

export type Output = OutputEntry[];

export const computeOutputPrompt = (input: string) => {
  return `
   You have to provide an output that matches the ExpectedOutput type from the following TypeScript type definition. Priority goes to the charts types first, then the paragraph type. The output should be in JSON only,without escaping characters, new lines or any markdown or code block.

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

export type Output = OutputEntry[];
  `;
};
