export type SqlChartType = "lineChart" | "pieChart" | "paragraph";

export type ExpectedSqlOutput<T extends SqlChartType> = {
  type: T;
  sqlQuery: string;
  columns: ExpectedSqlColumns<T>; // Add the columns field based on the chart type
};

export type LineChartColumns = {
  x: number | string | Date;
  y: number;
};

export type PieChartColumns = {
  category: string;
  value: number;
};

export type ParagraphColumns = {
  text: string;
};

export type ExpectedSqlColumns<T extends SqlChartType> = T extends "lineChart"
  ? LineChartColumns
  : T extends "pieChart"
  ? PieChartColumns
  : T extends "paragraph"
  ? ParagraphColumns
  : never;

export const expectedOutput = `
export type SqlChartType = "lineChart" | "pieChart" | "paragraph";

export type ExpectedSqlOutput<T extends SqlChartType> = {
  type: T;
  sqlQuery: string;
  columns: ExpectedSqlColumns<T>; // Add the columns field based on the chart type
};

export type LineChartColumns = {
  x: number | string | Date;
  y: number;
};

export type PieChartColumns = {
  category: string;
  value: number;
};

export type ParagraphColumns = {
  text: string;
};

export type ExpectedSqlColumns<T extends SqlChartType> = T extends "lineChart"
  ? LineChartColumns
  : T extends "pieChart"
  ? PieChartColumns
  : T extends "paragraph"
  ? ParagraphColumns
  : never;

`;

// Removed this for now. It was returning this for total question.
// export const exclusionOutput = `
// { "type" :"paragraph", "data": "Not allowed to answer this question."}
// `;
