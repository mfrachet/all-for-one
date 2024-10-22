import { getOpenAIResponse } from "@all-for-one/ai";
import { generateClickhouseQuery } from "@all-for-one/ai";
import { CachingService } from "../services/CachingService";
import { AiContext, ExpectedOutput } from "../types";

import { ComputeService } from "../services/ComputeService";
export class ComputeController {
  constructor(
    private computeService: ComputeService,
    private cacheService: CachingService<AiContext>
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

      const formattedResponse = await this.computeService.execute(
        responseObj.type,
        responseObj.title,
        responseObj.sqlQuery
      );

      return formattedResponse;
    } catch {
      return null;
    }
  }
}
