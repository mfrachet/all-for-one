import { LineChart } from "../components/charts/LineChart";
import { lineChartFixture } from "../fixtures/lineChart.fixture";

export const IndexPage = () => {
  return (
    <main>
      <h1 className="text-2xl font-bold">Hello world</h1>

      <div className="w-full h-96">
        <LineChart data={lineChartFixture} />
      </div>
    </main>
  );
};
