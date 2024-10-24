import { AiResponseEntry } from "../types";
import { Message } from "./Message";
import { ChartWrapper } from "./ChartWrapper";
import { Form, useNavigation } from "react-router-dom";
import { ChartFactory } from "./ChartFactory";

import { PinButton } from "./PinButton";

const ResponseMessage = ({ message }: { message: AiResponseEntry }) => {
  const navigation = useNavigation();

  const isSubmitPending =
    navigation.state !== "idle" &&
    navigation.formMethod === "post" &&
    navigation?.formData?.get("chartId")?.toString() === message.id;

  if (message.type === "paragraph") {
    return (
      <Message isResponse={true}>
        <Form method="post" action="/" className="inline-block relative">
          <input type="hidden" name="chartId" value={message.id} />
          <ChartFactory chart={message} />

          <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
            <PinButton isLoading={isSubmitPending} />
          </div>
        </Form>
      </Message>
    );
  }

  return (
    <Message isResponse={true}>
      <Form method="post" action="/" className="relative">
        <input type="hidden" name="chartId" value={message.id} />

        <ChartWrapper>
          <ChartFactory chart={message} />
        </ChartWrapper>

        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
          <PinButton isLoading={isSubmitPending} />
        </div>
      </Form>
    </Message>
  );
};

export const MessageFactory = ({ message }: { message: AiResponseEntry }) => {
  if (message.isResponse) {
    return <ResponseMessage message={message} />;
  }

  if (message.type === "paragraph") {
    return <Message isResponse={false}>{message.data}</Message>;
  }

  return null;
};
