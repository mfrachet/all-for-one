import { PersistentChart } from "../types";
import { CachingService } from "./CachingService";

export class PersistentChartService {
  constructor(private cachingService: CachingService) {}

  async pinUnpinChart(chartId: string) {
    const cachedChart = this.cachingService.get(`chart:${chartId}`);

    if (!cachedChart) return null;

    const alreadyCachedForCustomer = await this.cachingService.get(
      `customer:charts:${chartId}`
    );

    if (alreadyCachedForCustomer) {
      // Un pin
      await this.cachingService.remove(`customer:charts:${chartId}`);
    } else {
      // Pin
      await this.cachingService.set(`customer:charts:${chartId}`, chartId);
    }
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
