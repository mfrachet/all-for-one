import { Form, useLocation, useNavigation } from "react-router-dom";
import { AiResponseEntry } from "../types";
import { BigStat } from "./BigStat";
import { LineChart } from "./charts/LineChart/LineChart";
import { PieChart } from "./charts/PieChart/PieChart";
import { PinButton } from "./PinButton";
import { ChartCard } from "./ChartCard";

export interface ChartFactoryProps {
  chart: AiResponseEntry;
  action?: "pin" | "unpin";
}

export const ChartFactory = ({ chart, action = "pin" }: ChartFactoryProps) => {
  const navigation = useNavigation();
  const location = useLocation();

  const isSubmitPending =
    navigation.state !== "idle" &&
    navigation.formMethod === "post" &&
    navigation?.formData?.get("chartId")?.toString() === chart.id;

  return (
    <Form
      method="post"
      action={`${location.pathname}${location.search.toString()}`}
      className={`relative ${chart.type === "paragraph" ? "inline-block" : ""}`}
    >
      <input type="hidden" name="chartId" value={chart.id} />
      <>
        {chart.type === "lineChart" && (
          <ChartCard title={chart.title}>
            <LineChart data={chart.data} />
          </ChartCard>
        )}
        {chart.type === "pieChart" && (
          <ChartCard title={chart.title}>
            <PieChart data={chart.data} />
          </ChartCard>
        )}
        {chart.type === "paragraph" && (
          <BigStat value={chart.data} title={chart.title} color={chart.color} />
        )}
      </>

      <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
        <PinButton isLoading={isSubmitPending} side={action} />
      </div>
    </Form>
  );
};
