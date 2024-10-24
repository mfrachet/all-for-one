import { Form, useNavigation } from "react-router-dom";
import { AiResponseEntry } from "../types";
import { BigStat } from "./BigStat";
import { LineChart } from "./charts/LineChart/LineChart";
import { PieChart } from "./charts/PieChart/PieChart";
import { PinButton } from "./PinButton";
import { ChartWrapper } from "./ChartWrapper";

export const ChartFactory = ({ chart }: { chart: AiResponseEntry }) => {
  const navigation = useNavigation();

  const isSubmitPending =
    navigation.state !== "idle" &&
    navigation.formMethod === "post" &&
    navigation?.formData?.get("chartId")?.toString() === chart.id;

  return (
    <Form
      method="post"
      action="/"
      className={`relative ${chart.type === "paragraph" ? "inline-block" : ""}`}
    >
      <input type="hidden" name="chartId" value={chart.id} />
      <>
        {chart.type === "lineChart" && (
          <ChartWrapper>
            <LineChart data={chart.data} />
          </ChartWrapper>
        )}
        {chart.type === "pieChart" && (
          <ChartWrapper>
            <PieChart data={chart.data} />
          </ChartWrapper>
        )}
        {chart.type === "paragraph" && (
          <BigStat value={chart.data} title={chart.title} color={chart.color} />
        )}
      </>

      <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
        <PinButton isLoading={isSubmitPending} />
      </div>
    </Form>
  );
};
