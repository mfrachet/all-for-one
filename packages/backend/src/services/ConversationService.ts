import { nanoid } from "nanoid";
import { Conversation, ConversationEntry } from "../types";
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

  async appendEntry(conversationId: string, entry: ConversationEntry) {
    const conversation = await this.getOrCreateConversation(conversationId);

    conversation.messages.push(entry);

    return this.setConversation(conversation);
  }
  createUserMessage(conversationId: string, input: string) {
    const message: ConversationEntry = {
      type: "paragraph",
      data: input,
      id: nanoid(),
      title: "",
      color: "",
      isResponse: false,
    };

    return this.appendEntry(conversationId, message);
  }
}
