import {
  ExpectedSqlColumns,
  LineChartColumns,
  ParagraphColumns,
  PieChartColumns,
  SqlChartType,
} from "@all-for-one/ai";
import {
  ExpectedOutput,
  LineChartOutput,
  ParagraphOutput,
  PieChartOutput,
} from "../types";
import { getRandomPastelColor } from "./getRandomPastelColor";

const isLineChartColumns = (
  type: SqlChartType,
  response: Array<ExpectedSqlColumns<typeof type>>
): response is Array<LineChartColumns> => {
  if (type !== "lineChart") {
    return false;
  }

  return response.every((item) => "x" in item && "y" in item);
};

const isPieChartColumns = (
  type: SqlChartType,
  response: Array<ExpectedSqlColumns<typeof type>>
): response is Array<PieChartColumns> => {
  if (type !== "pieChart") {
    return false;
  }

  return response.every((item) => "category" in item && "value" in item);
};

const isParagraphColumns = (
  type: SqlChartType,
  response: Array<ExpectedSqlColumns<typeof type>>
): response is Array<ParagraphColumns> => {
  if (type !== "paragraph") {
    return false;
  }

  return response.every((item) => "text" in item);
};

export const mapAiResponse = (
  type: SqlChartType,
  response: Array<ExpectedSqlColumns<typeof type>>
): ExpectedOutput => {
  if (!type) {
    return [];
  }

  if (isParagraphColumns(type, response)) {
    const paragraphOutput: ParagraphOutput = {
      type: "paragraph",
      data: response[0]?.text ?? "No data found",
    };
    return [paragraphOutput];
  }

  if (isLineChartColumns(type, response)) {
    const lineChartOutput: LineChartOutput = {
      type: "lineChart",
      data: [
        {
          color: getRandomPastelColor(),
          id: "1",
          data: response.map((item) => ({
            x: item.x,
            y: item.y,
          })),
        },
      ],
    };
    return [lineChartOutput];
  }

  if (isPieChartColumns(type, response)) {
    const pieChartOutput: PieChartOutput = {
      type: "pieChart",
      data: response.map((item) => ({
        id: "1",
        label: item.category,
        value: item.value,
        color: getRandomPastelColor(),
      })),
    };
    return [pieChartOutput];
  }

  return [];
};
