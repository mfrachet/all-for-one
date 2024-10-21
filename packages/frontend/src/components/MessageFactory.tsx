import { MessageEntry } from "../types";
import { lazy, Suspense } from "react";
import { Message } from "./Message";
import { ChartWrapper } from "./ChartWrapper";

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
    <Suspense>
      <Message isResponse={message.isResponse}>
        {message.type === "lineChart" && (
          <ChartWrapper>
            <LineChart data={message.data} />
          </ChartWrapper>
        )}
        {message.type === "paragraph" && <p>{message.data}</p>}
        {message.type === "pieChart" && (
          <ChartWrapper>
            <PieChart data={message.data} />
          </ChartWrapper>
        )}
      </Message>
    </Suspense>
  );
};
