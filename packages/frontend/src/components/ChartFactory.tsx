import { AiResponseEntry } from "../types";
import { BigStat } from "./BigStat";
import { LineChart } from "./charts/LineChart/LineChart";
import { PieChart } from "./charts/PieChart/PieChart";

export const ChartFactory = ({ chart }: { chart: AiResponseEntry }) => {
  console.log(chart);
  return (
    <>
      {chart.type === "lineChart" && <LineChart data={chart.data} />}
      {chart.type === "pieChart" && <PieChart data={chart.data} />}
      {chart.type === "paragraph" && (
        <BigStat value={chart.data} title={chart.title} color={chart.color} />
      )}
    </>
  );
};
