import { ExpectedSqlColumns } from "@all-for-one/ai";
import { ExpectedOutput, LineChartOutput } from "../types";

export const mapAiResponse = (
  response: Array<ExpectedSqlColumns>
): ExpectedOutput => {
  const responseType: ExpectedOutput[number]["type"] = response[0]?.type;

  if (!responseType) {
    return [];
  }

  if (responseType === "lineChart") {
    const lineChartOutput: LineChartOutput = {
      type: "lineChart",
      data: response.map((item) => ({
        color: "red",
        id: "1",
        data: [{ x: item.x, y: item.y }],
      })),
    };

    return [lineChartOutput];
  }

  return [];
};
