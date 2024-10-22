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

export type ExpectedOutput = OutputEntry[];

const typeDef = `
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

export type ExpectedOutput = OutputEntry[];
`;

const promptArray = [
  "The output should be in JSON only. Escaping characters, markdown or code blocks are prohibited from the answer.",
  "When resolving data, priority goes to the charts types first, then the paragraph type. The chart colors should be pastel.",
  `You have to provide an output that matches exactly the "ExpectedOutput" type from the following TypeScript type definition.`,
  typeDef,
];

export const computeOutputPrompt = (input: string) => {
  return promptArray.join("\n");
};
