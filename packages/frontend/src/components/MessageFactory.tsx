import { MessageEntry } from "../types";
import { lazy, Suspense } from "react";
import { Message } from "./Message";
import { ChartWrapper } from "./ChartWrapper";
import { Spinner } from "./Spinner";

const LineChart = lazy(() =>
  import("./charts/LineChart").then((m) => ({
    default: m.LineChart,
  }))
);

const PieChart = lazy(() =>
  import("./charts/PieChart").then((m) => ({
    default: m.PieChart,
  }))
);

export const MessageFactory = ({ message }: { message: MessageEntry }) => {
  return (
    <Message isResponse={message.isResponse}>
      {message.type === "lineChart" && (
        <Suspense
          fallback={
            <ChartWrapper>
              <Spinner />
            </ChartWrapper>
          }
        >
          <ChartWrapper>
            <LineChart data={message.data} />
          </ChartWrapper>
        </Suspense>
      )}
      {message.type === "paragraph" && <p>{message.data}</p>}
      {message.type === "pieChart" && (
        <Suspense
          fallback={
            <ChartWrapper>
              <Spinner />
            </ChartWrapper>
          }
        >
          <ChartWrapper>
            <PieChart data={message.data} />
          </ChartWrapper>
        </Suspense>
      )}
    </Message>
  );
};
