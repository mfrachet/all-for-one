export type SqlChartType =
  | "lineChart"
  | "pieChart"
  | "paragraph"
  | "mapChart"
  | "table";

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
  data: Array<{
    groupingKey?: string;
    category: string;
    value: number;
  }>;
};

export type Paragraph = {
  type: "paragraph";
  data: Array<{ text: string }>;
};

export type MapChart = {
  type: "mapChart";
  data: Array<{
    id: string;
    value: number;
  }>;
};

export type Table = {
  type: "table";
  data: Array<Record<string, any>>;
};

export type ExpectedSqlColumns =
  | LineChart
  | PieChart
  | Paragraph
  | MapChart
  | Table;

export const expectedSqlColumns = `
  For lineChart, the columns should follow this format: {x:date, y:number, groupingKey?:string}. groupingKey should be a name, id, or some identifier. 
  For lineChart, the x should be a date, and we should use toStartOfMonth, toStartOfDay, toStartOfYear.  We don't want to have a granularity of seconds, minutes or hours. 
  For lineChart, the x granularity if not specified, should be toStartOfMonth.
  
  For pieChart, the columns should be: {category: string, value: number, groupingKey?:string}. groupingKey should be a name, id, or some identifier.
  
  For paragraph, the columns should follow this format: {text: string} and should only contain the result of the query, nothing else.

  For mapChart, the columns should be: {id: string, value: number}.
  For mapChart, sometimes you will ended reaching a field that is a JSON: in this case, you should extract the country.

  For table, the columns are dynamic, and should be the columns of the query.
  For table, the value in each column should always be a primitive value (string, number, boolean, date).
  For table, the number of rows should be less than 10.

  If your are asked to provide data by country, try to use a mapChart.
`;

export const expectedOutput = `
export type SqlChartType = "lineChart" | "pieChart" | "paragraph" | "mapChart" | "table";

export type ExpectedSqlOutput<T extends SqlChartType> = {
  type: T;
  title: string; // should be a short title of 2-3 words max
  sqlQuery: string;
};
`;
