import { PersistentChart } from "../types";
import { CachingService } from "./CachingService";

export class PersistentChartService {
  constructor(private cachingService: CachingService) {}

  async saveChart(chartId: string) {
    const cachedChart = this.cachingService.get(`chart:${chartId}`);

    if (!cachedChart) return null;

    await this.cachingService.set(`customer:charts:${chartId}`, chartId);
  }

  async getChartData(chartId: string): Promise<PersistentChart> {
    const customerChartId = await this.cachingService.get(
      `customer:charts:${chartId}`
    );

    if (!customerChartId) {
      throw new Error("Chart not found");
    }

    const chartData = await this.cachingService.get(`chart:${customerChartId}`);

    return chartData as unknown as PersistentChart;
  }

  async getChartIds() {
    const customerCharts = await this.cachingService.getEntries(
      `customer:charts`
    );

    return customerCharts.map((chart) => chart.value) as Array<string>;
  }
}
