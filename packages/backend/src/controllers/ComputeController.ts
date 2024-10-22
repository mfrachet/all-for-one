import { ExpectedSqlColumns, getOpenAIResponse } from "@all-for-one/ai";
import { generateClickhouseQuery } from "@all-for-one/ai";
import { CachingService } from "../services/CachingService";
import { AiContext, ExpectedOutput } from "../types";
import { mapAiResponse } from "../helpers/mapAiResponse";
import { clickhouseClient } from "../services/clickhouse";
export class ComputeController {
  constructor(private cacheService: CachingService<AiContext>) {}

  async _getCachedContext(conversationId: string) {
    const cachedCtx = await this.cacheService.get(conversationId);
    if (!cachedCtx) {
      const ctx: AiContext = [];
      return ctx;
    }

    return cachedCtx;
  }

  async compute(
    conversationId: string,
    input: string
  ): Promise<ExpectedOutput | null> {
    const prompt = generateClickhouseQuery(input);

    console.log("[AI] user input", input);

    const cachedCtx = await this._getCachedContext(conversationId);
    cachedCtx.push({ role: "user", content: prompt });

    const response = await getOpenAIResponse(prompt, cachedCtx);
    cachedCtx.push({ role: "assistant", content: response || "" });

    await this.cacheService.set(conversationId, cachedCtx);

    if (response) {
      const responseObj = JSON.parse(response);
      if (responseObj.sqlQuery && responseObj.type && responseObj.title) {
        const resultSet = await clickhouseClient.query({
          query: responseObj.sqlQuery,
          format: "JSONEachRow",
        });

        console.log("[Clickhouse] sql query generated", responseObj.sqlQuery);

        const rows: ExpectedSqlColumns = {
          type: responseObj.type,
          data: (await resultSet.json()) as any,
        };

        const formattedResponse = mapAiResponse(
          responseObj.type,
          responseObj.title,
          rows
        );

        return formattedResponse;
      }
    }

    return null;
  }
}
