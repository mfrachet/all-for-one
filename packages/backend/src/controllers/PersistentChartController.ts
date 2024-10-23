import { PersistentChartService } from "../services/PersistentChartService";
import { ComputeService } from "../services/ComputeService";
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
}
