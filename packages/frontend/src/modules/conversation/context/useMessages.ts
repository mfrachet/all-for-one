import { useContext } from "react";
import { MessageContext } from "./MessageContext";

export const useMessages = () => {
  return useContext(MessageContext);
};
