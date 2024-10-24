import { nanoid } from "nanoid";
import { Conversation, FormattedResponse } from "../types";
import { CachingService } from "./CachingService";

export class ConversationService {
  constructor(private readonly cachingService: CachingService) {}

  async getOrCreateConversation(conversationId: string) {
    const existingConversation = await this.cachingService.get(
      `conversation:${conversationId}`
    );

    if (existingConversation) return existingConversation;

    const conversation: Conversation = {
      id: conversationId,
      messages: [],
    };

    return this.setConversation(conversation);
  }

  async setConversation(conversation: Conversation) {
    await this.cachingService.set(
      `conversation:${conversation.id}`,
      conversation
    );

    return conversation;
  }

  async appendEntry(conversationId: string, entry: FormattedResponse) {
    const conversation = await this.getOrCreateConversation(conversationId);

    conversation.messages.push(entry);

    return this.setConversation(conversation);
  }
  createUserMessage(conversationId: string, input: string) {
    const message: FormattedResponse = {
      type: "paragraph",
      data: input,
      id: nanoid(),
      title: "",
      color: "",
    };

    return this.appendEntry(conversationId, message);
  }
}
