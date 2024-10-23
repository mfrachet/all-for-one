import { ExpectedSqlColumns, SqlChartType } from "@all-for-one/ai";
import { clickhouseClient } from "./clickhouse";
import { mapAiResponse } from "../helpers/mapAiResponse";

export class ComputeService {
  async execute(type: SqlChartType, title: string, sql: string) {
    console.log("[Compute] sql", sql);
    const resultSet = await clickhouseClient.query({
      query: sql,
      format: "JSONEachRow",
    });

    console.log("[Clickhouse] sql query generated", sql);

    const rows: ExpectedSqlColumns = {
      type,
      data: (await resultSet.json()) as any,
    };

    const formattedResponse = mapAiResponse(type, title, rows);

    return formattedResponse;
  }
}
