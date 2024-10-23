import { AiResponseEntry } from "../types";
import { LineChart } from "./charts/LineChart/LineChart";
import { PieChart } from "./charts/PieChart/PieChart";

export const ChartFactory = ({ chart }: { chart: AiResponseEntry }) => {
  return (
    <>
      {chart.type === "lineChart" && <LineChart data={chart.data} />}
      {chart.type === "pieChart" && <PieChart data={chart.data} />}
      {chart.type === "paragraph" && <p>{chart.data}</p>}
    </>
  );
};
