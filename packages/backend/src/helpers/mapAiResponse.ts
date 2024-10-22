import {
  ExpectedSqlColumns,
  LineChart,
  Paragraph,
  PieChart,
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
  response: ExpectedSqlColumns
): response is LineChart => {
  return response.type === "lineChart";
};

// const isPieChartColumns = (
//   type: SqlChartType,
//   response: ExpectedSqlColumns
// ): response is PieChart => {
//   if (response.type === "pieChart") {
//     return response.every((item) => "category" in item && "value" in item);
//   }

//   return response.every((item) => "category" in item && "value" in item);
// };

const isParagraphColumns = (
  response: ExpectedSqlColumns
): response is Paragraph => {
  return response.type === "paragraph";
};

export const mapAiResponse = (
  type: SqlChartType,
  title: string,
  response: ExpectedSqlColumns
): ExpectedOutput => {
  if (!type) {
    return [];
  }

  if (isParagraphColumns(response)) {
    const paragraphOutput: ParagraphOutput = {
      type: "paragraph",
      data: response?.data[0]?.text ?? "No data found",
    };
    return [paragraphOutput];
  }

  if (isLineChartColumns(response)) {
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

    console.log({ groupedByKey, title });

    const lineChartOutput: LineChartOutput = {
      type: "lineChart",
      data: Object.entries(groupedByKey).map(([groupingKey, data]) => ({
        color: getRandomPastelColor(groupingKey),
        id: groupingKey,
        data,
      })),
    };

    console.log(lineChartOutput);

    return [lineChartOutput];
  }

  // if (isPieChartColumns(type, response)) {
  //   const pieChartOutput: PieChartOutput = {
  //     type: "pieChart",
  //     data: response.map((item) => ({
  //       id: title,
  //       label: item.category,
  //       value: item.value,
  //       color: getRandomPastelColor(title),
  //     })),
  //   };
  //   return [pieChartOutput];
  // }

  return [];
};
