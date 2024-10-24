import { PersistentChartService } from "../services/PersistentChartService";
import { ComputeService } from "../services/ComputeService";
import { Suggestion } from "../types";
import { getOpenAIResponse, getSuggestionsPrompt } from "@all-for-one/ai";
export class PersistentChartController {
  constructor(
    private persistentChartService: PersistentChartService,
    private computeService: ComputeService
  ) {}

  pinUnpinChart(chartId: string) {
    return this.persistentChartService.pinUnpinChart(chartId);
  }

  async getCharts() {
    const chartsIds = await this.persistentChartService.getChartIds();

    const chartsData = await Promise.all(
      chartsIds.map((chartId) =>
        this.persistentChartService.getChartData(chartId)
      )
    );

    const formattedResponses = await Promise.all(
      chartsData.map((chart) => this.computeService.execute(chart))
    );

    return formattedResponses.flatMap((response) => response);
  }

  async getSuggestions() {
    try {
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

      return JSON.parse(response || "[]");
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
