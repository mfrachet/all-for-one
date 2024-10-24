import { getOpenAIResponse } from "@all-for-one/ai";

import { generateClickhouseQuery } from "@all-for-one/ai";
import { CachingService } from "../services/CachingService";
import { AiContext, ExpectedOutput, PersistentChart } from "../types";

import { ComputeService } from "../services/ComputeService";
import { nanoid } from "nanoid";
import { ConversationService } from "../services/ConversationService";
export class ComputeController {
  constructor(
    private computeService: ComputeService,
    private cacheService: CachingService,
    private conversationService: ConversationService
  ) {}

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
    const cachedCtx = await this._getCachedContext(conversationId);

    cachedCtx.push({ role: "user", content: prompt });
    const response = await getOpenAIResponse(prompt, cachedCtx);
    cachedCtx.push({ role: "assistant", content: response || "" });
    await this.cacheService.set(conversationId, cachedCtx);

    if (!response) return null;

    try {
      const responseObj = JSON.parse(response);

      if (!responseObj.sqlQuery || !responseObj.type || !responseObj.title)
        return null;

      const persistentChart: PersistentChart = {
        id: nanoid(),
        type: responseObj.type,
        title: responseObj.title,
        sqlQuery: responseObj.sqlQuery,
      };

      const chartsResponse = await this.computeService.execute(persistentChart);

      await this.cacheService.set(
        `chart:${persistentChart.id}`,
        persistentChart
      );

      await this.conversationService.createUserMessage(conversationId, input);

      for (const chartResponse of chartsResponse) {
        await this.conversationService.appendEntry(conversationId, {
          ...chartResponse,
          isResponse: true,
        });
      }

      return chartsResponse;
    } catch (e) {
      console.error("[Compute] error", e);
      return null;
    }
  }
}
