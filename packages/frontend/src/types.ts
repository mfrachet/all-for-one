import { ConversationResponse } from "./modules/conversation/types";

export type AiResponseEntry = ConversationResponse & { isResponse?: boolean };
