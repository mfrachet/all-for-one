import { MessageEntry } from "../types";

import { Message } from "./Message";
import { ChartWrapper } from "./ChartWrapper";
import { LineChart } from "./charts/LineChart/LineChart";
import { PieChart } from "./charts/PieChart/PieChart";

export const MessageFactory = ({ message }: { message: MessageEntry }) => {
  return (
    <Message isResponse={message.isResponse}>
      {message.type === "lineChart" && (
        <ChartWrapper>
          <LineChart data={message.data} />
        </ChartWrapper>
      )}
      {message.type === "paragraph" && <p>{message.data}</p>}
      {message.type === "pieChart" && (
        <ChartWrapper size="full">
          <PieChart data={message.data} />
        </ChartWrapper>
      )}
    </Message>
  );
};
