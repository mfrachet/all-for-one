import { ExpectedSqlColumns } from "@all-for-one/ai";
import { clickhouseClient } from "./clickhouse";
import {
  ExpectedOutput,
  LineChartOutput,
  MapChartOutput,
  ParagraphOutput,
  PersistentChart,
  PieChartOutput,
  TableOutput,
} from "../types";
import {
  getPastelColor,
  getPasterColorsForTitles,
} from "../helpers/pastelColors";

export class ComputeService {
  async execute(chart: PersistentChart) {
    console.log("[Compute] sql", chart.sqlQuery);
    const resultSet = await clickhouseClient.query({
      query: chart.sqlQuery,
      format: "JSONEachRow",
    });

    console.log("[Clickhouse] sql query generated", chart.sqlQuery);

    const rows: ExpectedSqlColumns = {
      type: chart.type,
      data: (await resultSet.json()) as any,
    };

    const formattedResponse = this.mapAiResponse(chart, rows);

    return formattedResponse;
  }

  mapAiResponse = (
    chart: PersistentChart,
    response: ExpectedSqlColumns
  ): ExpectedOutput => {
    if (!chart.type) {
      return [];
    }

    if (response.type === "paragraph") {
      const colors = getPasterColorsForTitles([chart.title]);
      const paragraphOutput: ParagraphOutput = {
        id: chart.id,
        title: chart.title,
        type: "paragraph",
        color: colors[chart.title],
        data: response?.data[0]?.text ?? "No data found",
        sqlQuery: chart.sqlQuery,
      };
      return [paragraphOutput];
    }

    if (response.type === "lineChart") {
      const groupedByKey = response.data
        .sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime())
        .reduce((acc, item) => {
          acc[item.groupingKey ?? chart.title] = [
            ...(acc[item.groupingKey ?? chart.title] || []),
            {
              x: item.x,
              y: item.y,
            },
          ];
          return acc;
        }, {} as Record<string, Array<{ x: number | string | Date; y: number }>>);

      const colors = getPasterColorsForTitles(Object.keys(groupedByKey));
      const lineChartOutput: LineChartOutput = {
        id: chart.id,
        title: chart.title,
        type: "lineChart",
        data: Object.entries(groupedByKey).map(([groupingKey, data]) => ({
          color: colors[groupingKey],
          id: groupingKey,
          data,
        })),
        sqlQuery: chart.sqlQuery,
      };

      return [lineChartOutput];
    }

    if (response.type === "pieChart") {
      const colors = getPasterColorsForTitles(
        response.data.map((d) => d.category)
      );
      const pieChartOutput: PieChartOutput = {
        id: chart.id,
        title: chart.title,
        type: "pieChart",
        data: response.data.map((item) => ({
          id: item.category,
          label: item.category,
          value: Number(item.value),
          color: colors[item.category],
        })),
        sqlQuery: chart.sqlQuery,
      };
      return [pieChartOutput];
    }

    if (response.type === "mapChart") {
      const colors = getPasterColorsForTitles(response.data.map((d) => d.id));
      const mapChartOutput: MapChartOutput = {
        id: chart.id,
        title: chart.title,
        type: "mapChart",
        data: response.data.map((item) => ({
          id: item.id,
          value: Number(item.value),
          color: colors[item.id],
        })),
        sqlQuery: chart.sqlQuery,
      };

      return [mapChartOutput];
    }

    if (response.type === "table") {
      const tableOutput: TableOutput = {
        id: chart.id,
        title: chart.title,
        type: "table",
        data: response.data,
        sqlQuery: chart.sqlQuery,
      };

      return [tableOutput];
    }

    return [];
  };
}
