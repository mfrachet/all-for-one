import { LineChart } from "../components/charts/LineChart";
import { ChartWrapper } from "../components/ChartWrapper";
import { Message } from "../components/Message";
import { QuestionInput } from "../components/QuestionInput";
import { lineChartFixture } from "../fixtures/lineChart.fixture";

export const IndexPage = () => {
  return (
    <main className="h-full max-w-3xl mx-auto">
      <div className="h-full flex flex-col py-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Hello world</h1>

          <Message>Hello world</Message>
          <Message isResponse>
            Here is the data you were looking for
            <ChartWrapper>
              <LineChart data={lineChartFixture} />
            </ChartWrapper>
          </Message>
          <Message>Hello world</Message>
        </div>
        <QuestionInput />
      </div>
    </main>
  );
};
