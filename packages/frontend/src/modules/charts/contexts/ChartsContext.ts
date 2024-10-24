import { createContext } from "react";
import { AiResponseEntry } from "../../../types";

export const ChartsContext = createContext<{
  charts: AiResponseEntry[];
  chartsDict: Record<string, boolean>;
}>({
  charts: [],
  chartsDict: {},
});
