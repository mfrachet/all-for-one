import { ActionFunction, redirect } from "react-router-dom";
import { saveChart } from "../modules/charts/services/saveChart";

export const saveChartAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const chartId = formData.get("chartId")?.toString() ?? "";

  await saveChart(chartId);

  return redirect("/");
};
