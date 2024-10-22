import { ExpectedSqlColumns, SqlChartType } from "@all-for-one/ai";
import {
  ExpectedOutput,
  LineChartOutput,
  ParagraphOutput,
  PieChartOutput,
} from "../types";
import { getRandomPastelColor } from "./getRandomPastelColor";

export const mapAiResponse = (
  type: SqlChartType,
  title: string,
  response: ExpectedSqlColumns
): ExpectedOutput => {
  if (!type) {
    return [];
  }

  if (response.type === "paragraph") {
    const paragraphOutput: ParagraphOutput = {
      type: "paragraph",
      data: response?.data[0]?.text ?? "No data found",
    };
    return [paragraphOutput];
  }

  if (response.type === "lineChart") {
    const groupedByKey = response.data.reduce((acc, item) => {
      acc[item.groupingKey ?? title] = [
        ...(acc[item.groupingKey ?? title] || []),
        {
          x: item.x,
          y: item.y,
        },
      ];
      return acc;
    }, {} as Record<string, Array<{ x: number | string | Date; y: number }>>);

    const lineChartOutput: LineChartOutput = {
      type: "lineChart",
      data: Object.entries(groupedByKey).map(([groupingKey, data]) => ({
        color: getRandomPastelColor(groupingKey),
        id: groupingKey,
        data,
      })),
    };

    return [lineChartOutput];
  }

  if (response.type === "pieChart") {
    const pieChartOutput: PieChartOutput = {
      type: "pieChart",
      data: response.data.map((item) => ({
        id: title,
        label: item.category,
        value: Number(item.value),
        color: getRandomPastelColor(item.category),
      })),
    };
    return [pieChartOutput];
  }

  return [];
};
