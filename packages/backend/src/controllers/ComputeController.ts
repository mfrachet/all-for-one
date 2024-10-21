import { Request, Response } from "express";
import { getOpenAIResponse } from "@all-for-one/ai";
import { computePrompt } from "@all-for-one/ai";
import { CachingService } from "../services/cachingService";
import { AiContext } from "../types";

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

  async compute(req: Request, res: Response) {
    const conversationId = req.params.id;
    const input = req.body.input as string;
    const prompt = computePrompt(input);

    const cachedCtx = await this._getCachedContext(conversationId);
    cachedCtx.push({ role: "user", content: prompt });

    const response = await getOpenAIResponse(prompt, cachedCtx);
    cachedCtx.push({ role: "assistant", content: response || "" });

    await this.cacheService.set(conversationId, cachedCtx);

    if (!response) {
      return res.status(404).send({ error: "Not found" });
    }

    try {
      res.send(JSON.parse(response));
    } catch (error) {
      console.error({ error });
      res.status(500).send({ error: "Internal server error", details: error });
    }
  }
}
