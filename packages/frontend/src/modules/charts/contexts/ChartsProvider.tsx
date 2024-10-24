import { AiResponseEntry } from "../../../types";
import { ChartsContext } from "./ChartsContext";

export interface ChartsProviderProps {
  charts: AiResponseEntry[];
  children: React.ReactNode;
}

export const ChartsProvider = ({ charts, children }: ChartsProviderProps) => {
  const chartsDict = charts.reduce((acc, chart) => {
    acc[chart.id] = true;
    return acc;
  }, {} as Record<string, boolean>);

  return (
    <ChartsContext.Provider value={{ charts, chartsDict }}>
      {children}
    </ChartsContext.Provider>
  );
};
