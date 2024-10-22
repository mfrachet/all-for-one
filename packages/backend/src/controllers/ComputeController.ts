import { Request, Response } from "express";
import { getOpenAIResponse } from "@all-for-one/ai";
import { generateClickhouseQuery } from "@all-for-one/ai";
import { CachingService } from "../services/CachingService";
import { AiContext, ExpectedOutput } from "../types";
import { mapAiResponse } from "../helpers/mapAiResponse";

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

    const cachedCtx = await this._getCachedContext(conversationId);
    cachedCtx.push({ role: "user", content: prompt });

    const response = await getOpenAIResponse(prompt, cachedCtx);
    cachedCtx.push({ role: "assistant", content: response || "" });

    await this.cacheService.set(conversationId, cachedCtx);

    if (response) {
      const formattedResponse = mapAiResponse(JSON.parse(response));
      return formattedResponse;
    }

    return null;
  }
}
