import { AiResponseEntry } from "../types";
import { Message } from "./Message";
import { ChartWrapper } from "./ChartWrapper";
import { Form } from "react-router-dom";
import { ChartFactory } from "./ChartFactory";
import React from "react";

export const MessageFactory = ({ message }: { message: AiResponseEntry }) => {
  const Wrapper = message.type === "paragraph" ? React.Fragment : ChartWrapper;
  return (
    <Message isResponse={message.isResponse}>
      <Form method="post" action="/dashboard">
        <input type="hidden" name="chartId" value={message.id} />

        <Wrapper>
          <ChartFactory chart={message} />
        </Wrapper>

        <button type="submit">Pin</button>
      </Form>
    </Message>
  );
};
