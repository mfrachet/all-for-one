import { createContext } from "react";
import { AiResponseEntry } from "../../../types";

export const ChartsContext = createContext<AiResponseEntry[]>([]);
