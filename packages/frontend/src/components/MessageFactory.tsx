import { MessageEntry } from "../types";
import { lazy, Suspense } from "react";
import { Message } from "./Message";
import { ChartWrapper } from "./ChartWrapper";

const LineChart = lazy(() =>
  import("./charts/LineChart").then((m) => ({
    default: m.LineChart,
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
      </Message>
    </Suspense>
  );
};
