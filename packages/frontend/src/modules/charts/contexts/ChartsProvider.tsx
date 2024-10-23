import { AiResponseEntry } from "../../../types";
import { ChartsContext } from "./ChartsContext";

export interface ChartsProviderProps {
  charts: AiResponseEntry[];
  children: React.ReactNode;
}

export const ChartsProvider = ({ charts, children }: ChartsProviderProps) => {
  return (
    <ChartsContext.Provider value={charts}>{children}</ChartsContext.Provider>
  );
};
