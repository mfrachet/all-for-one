import { PersistentChartService } from "../services/PersistentChartService";
import { ComputeService } from "../services/ComputeService";
import { Suggestion } from "../types";
import { getOpenAIResponse, getSuggestionsPrompt } from "@all-for-one/ai";
export class PersistentChartController {
  constructor(
    private persistentChartService: PersistentChartService,
    private computeService: ComputeService
  ) {}

  saveChart(chartId: string) {
    return this.persistentChartService.saveChart(chartId);
  }

  async getCharts() {
    const chartsIds = await this.persistentChartService.getChartIds();

    const chartsData = await Promise.all(
      chartsIds.map((chartId) =>
        this.persistentChartService.getChartData(chartId)
      )
    );

    const formattedResponses = await Promise.all(
      chartsData.map((chart) =>
        this.computeService.execute(chart!.type, chart!.title, chart!.sqlQuery)
      )
    );

    return formattedResponses.flatMap((response) => response);
  }

  async getSuggestions() {
    const chartsIds = await this.persistentChartService.getChartIds();

    const chartsData = await Promise.all(
      chartsIds.map((chartId) =>
        this.persistentChartService.getChartData(chartId)
      )
    );

    const alreadyExistingCharts: Array<Suggestion> = chartsData.map(
      (chart) => ({
        title: chart!.title,
        type: chart!.type,
      })
    );

    const response = await getOpenAIResponse(
      getSuggestionsPrompt(
        alreadyExistingCharts.map((chart) => chart.title).join(", ")
      ),
      []
    );

    console.log(
      "xx",
      getSuggestionsPrompt(
        alreadyExistingCharts.map((chart) => chart.title).join(", ")
      )
    );

    return JSON.parse(response || "[]");
  }
}
