import { createContext } from "react";
import { AiResponseEntry } from "../../../types";

export const MessageContext = createContext<{
  messages: Array<AiResponseEntry>;
  addMessage: (message: string) => void;
  isPending: boolean;
}>({
  messages: [],
  addMessage: () => {},
  isPending: false,
});
