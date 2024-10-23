import { ExpectedSqlColumns, SqlChartType } from "@all-for-one/ai";
import {
  ExpectedOutput,
  LineChartOutput,
  ParagraphOutput,
  PieChartOutput,
} from "../types";
import { getRandomPastelColors } from "./pastelColors";
import { nanoid } from "nanoid";

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
      id: nanoid(),
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

    const colors = getRandomPastelColors(Object.keys(groupedByKey).length);
    const lineChartOutput: LineChartOutput = {
      id: nanoid(),
      type: "lineChart",
      data: Object.entries(groupedByKey).map(([groupingKey, data], index) => ({
        color: colors[index],
        id: groupingKey,
        data,
      })),
    };

    return [lineChartOutput];
  }

  if (response.type === "pieChart") {
    const colors = getRandomPastelColors(response.data.length);
    const pieChartOutput: PieChartOutput = {
      id: nanoid(),
      type: "pieChart",
      data: response.data.map((item, index) => ({
        id: item.category,
        label: item.category,
        value: Number(item.value),
        color: colors[index],
      })),
    };
    return [pieChartOutput];
  }

  return [];
};
