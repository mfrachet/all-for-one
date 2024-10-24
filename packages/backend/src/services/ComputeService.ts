import { ExpectedSqlColumns, SqlChartType } from "@all-for-one/ai";
import { clickhouseClient } from "./clickhouse";
import { mapAiResponse } from "../helpers/mapAiResponse";
import { PersistentChart } from "../types";

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

    const formattedResponse = mapAiResponse(chart, rows);

    return formattedResponse;
  }
}
