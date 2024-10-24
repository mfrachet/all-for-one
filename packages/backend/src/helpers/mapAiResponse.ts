import { ExpectedSqlColumns } from "@all-for-one/ai";
import { getPastelColor } from "./pastelColors";
import {
  PersistentChart,
  ExpectedOutput,
  ParagraphOutput,
  LineChartOutput,
  PieChartOutput,
  MapChartOutput,
} from "../types";

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
      color: getPastelColor(chart.title),
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

    const lineChartOutput: LineChartOutput = {
      id: chart.id,
      title: chart.title,
      type: "lineChart",
      data: Object.entries(groupedByKey).map(([groupingKey, data], index) => ({
        color: getPastelColor(groupingKey),
        id: groupingKey,
        data,
      })),
    };

    return [lineChartOutput];
  }

  if (response.type === "pieChart") {
    const pieChartOutput: PieChartOutput = {
      id: chart.id,
      title: chart.title,
      type: "pieChart",
      data: response.data.map((item) => ({
        id: item.category,
        label: item.category,
        value: Number(item.value),
        color: getPastelColor(item.category),
      })),
    };
    return [pieChartOutput];
  }

  if (response.type === "mapChart") {
    const mapChartOutput: MapChartOutput = {
      id: chart.id,
      title: chart.title,
      type: "mapChart",
      data: response.data.map((item) => ({
        id: item.id,
        value: Number(item.value),
        color: getPastelColor(item.id),
      })),
    };

    return [mapChartOutput];
  }

  return [];
};
