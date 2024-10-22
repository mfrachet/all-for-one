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

const xpromptArray = [
  "The output should be in JSON only. Escaping characters, markdown or code blocks are prohibited from the answer.",
  "When resolving data, priority goes to the charts types first, then the paragraph type. The chart colors should be pastel.",
  `You have to provide an output that matches exactly the "ExpectedOutput" type from the following TypeScript type definition.`,
  typeDef,
];

type SqlChartType = "lineChart" | "pieChart";
type ExpectedSqlOutput = {
  chartType: SqlChartType;
  sqlQuery: string;
};

type ExpectedSqlColumns = {
  type: "lineChart";
  x: number | string | Date;
  y: number;
};

const typeExpected = `
type SqlChartType = "lineChart" | "pieChart";
type ExpectedSqlOutput = {
  chartType: SqlChartType;
  sqlQuery: string;
};

type ExpectedSqlColumns = {
  type: "lineChart";
  x: number | string | Date;
  y: number;
};

`;

const sqlPromptArray = [
  `You will generate a JSON of type ExpectedSqlOutput from the following type definition: ${typeExpected}`,
  `The sql query should provide columns matching the "ExpectedSqlColumns" type provided above.`,
  `The sql query should be a valid ClickHouse SQL query and only and strictly following the DDL passed in context.`,
];

export const computeOutputPrompt = (input: string) => {
  return sqlPromptArray.join("\n");
};
