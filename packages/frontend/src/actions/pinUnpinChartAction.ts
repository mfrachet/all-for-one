import { ActionFunction, redirect } from "react-router-dom";
import { pinUnpinChart } from "../modules/charts/services/pinUnpinChart";

export const pinUnpinChartAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const chartId = formData.get("chartId")?.toString() ?? "";

  await pinUnpinChart(chartId);

  return redirect("/");
};
