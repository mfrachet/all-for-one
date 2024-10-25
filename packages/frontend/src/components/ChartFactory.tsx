import { Form, useLocation, useNavigation } from "react-router-dom";
import { AiResponseEntry } from "../types";
import { BigStat } from "./BigStat";
import { LineChart } from "./charts/LineChart/LineChart";
import { PieChart } from "./charts/PieChart/PieChart";
import { PinButton } from "./PinButton";
import { ChartCard } from "./ChartCard";
import { MapChart } from "./charts/MapChart/MapChart";
import { Table } from "./charts/Table";

export interface ChartFactoryProps {
  chart: AiResponseEntry;
}

export const ChartFactory = ({ chart }: ChartFactoryProps) => {
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
        {chart.type === "mapChart" && (
          <ChartCard title={chart.title}>
            <MapChart data={chart.data} />
          </ChartCard>
        )}
        {chart.type === "paragraph" && (
          <BigStat value={chart.data} title={chart.title} color={chart.color} />
        )}
        {chart.type === "table" && (
          <ChartCard title={chart.title}>
            <Table data={chart.data} />
          </ChartCard>
        )}
      </>

      {["lineChart", "pieChart", "paragraph"].includes(chart.type) && (
        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
          <PinButton isLoading={isSubmitPending} chartId={chart.id} />
        </div>
      )}
    </Form>
  );
};
