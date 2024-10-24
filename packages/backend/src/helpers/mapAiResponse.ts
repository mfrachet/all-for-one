import { ExpectedSqlColumns, SqlChartType } from "@all-for-one/ai";
import {
  ExpectedOutput,
  LineChartOutput,
  ParagraphOutput,
  PersistentChart,
  PieChartOutput,
} from "../types";
import { getRandomPastelColor, getRandomPastelColors } from "./pastelColors";

export const mapAiResponse = (
  chart: PersistentChart,
  response: ExpectedSqlColumns
): ExpectedOutput => {
  if (!chart.type) {
    return [];
  }

  if (response.type === "paragraph") {
    const paragraphOutput: ParagraphOutput = {
      id: chart.id,
      title: chart.title,
      type: "paragraph",
      color: getRandomPastelColor(chart.title),
      data: response?.data[0]?.text ?? "No data found",
    };
    return [paragraphOutput];
  }

  if (response.type === "lineChart") {
    const groupedByKey = response.data.reduce((acc, item) => {
      acc[item.groupingKey ?? chart.title] = [
        ...(acc[item.groupingKey ?? chart.title] || []),
        {
          x: item.x,
          y: item.y,
        },
      ];
      return acc;
    }, {} as Record<string, Array<{ x: number | string | Date; y: number }>>);

    const colors = getRandomPastelColors(Object.keys(groupedByKey).length);
    const lineChartOutput: LineChartOutput = {
      id: chart.id,
      title: chart.title,
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
      id: chart.id,
      title: chart.title,
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
