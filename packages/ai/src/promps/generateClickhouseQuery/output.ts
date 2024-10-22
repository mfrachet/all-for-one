export type SqlChartType = "lineChart" | "pieChart";
export type ExpectedSqlOutput = {
  chartType: SqlChartType;
  sqlQuery: string;
};

export type ExpectedSqlColumns = {
  type: "lineChart";
  x: number | string | Date;
  y: number;
};

export const expectedOutput = `
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

export const exclusionOutput = `
{ "type" :"paragraph", "data": "Not allowed to answer this question."}
`;
