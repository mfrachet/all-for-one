export type SqlChartType = "lineChart" | "pieChart" | "paragraph";

export type ExpectedSqlOutput<T extends SqlChartType> = {
  type: T;
  title: string;
  sqlQuery: string;
};

export type LineChart = {
  type: "lineChart";
  data: Array<{
    groupingKey?: string;
    x: number | string | Date;
    y: number;
  }>;
};

export type PieChart = {
  type: "pieChart";
  category: string;
  value: number;
};

export type Paragraph = {
  type: "paragraph";
  data: Array<{ text: string }>;
};

export type ExpectedSqlColumns = LineChart | PieChart | Paragraph;

export const expectedSqlColumns = `
  For line chart, the columns should follow this format: {x:string, y:number, groupingKey?:string}. groupingKey should be a name, id, or some identifier.
  For pie chart, the columns should be: category and value.
  For paragraph, the columns should follow this format: {text: string}.
`;
export const expectedOutput = `
export type SqlChartType = "lineChart" | "pieChart" | "paragraph";

export type ExpectedSqlOutput<T extends SqlChartType> = {
  type: T;
  title: string; // should be a short title of 2-3 words max
  sqlQuery: string;
};
`;
