import { MessageEntry } from "../types";
import { lazy, Suspense } from "react";
import { Message } from "./Message";
import { ChartWrapper } from "./ChartWrapper";
import { LoaderCircle } from "lucide-react";

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
              <LoaderCircle className="w-6 h-6 animate-spin" />
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
              <LoaderCircle className="w-6 h-6 animate-spin" />
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
