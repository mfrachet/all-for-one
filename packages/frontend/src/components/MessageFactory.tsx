import { AiResponseEntry } from "../types";
import { Message } from "./Message";
import { ChartWrapper } from "./ChartWrapper";
import { Form, useNavigation } from "react-router-dom";
import { ChartFactory } from "./ChartFactory";
import React from "react";
import { Pin } from "lucide-react";
import { Spinner } from "./Spinner";

export const MessageFactory = ({ message }: { message: AiResponseEntry }) => {
  const navigation = useNavigation();

  const isSubmitPending =
    navigation.state !== "idle" &&
    navigation.formMethod === "post" &&
    navigation?.formData?.get("chartId")?.toString() === message.id;

  const Wrapper = message.type === "paragraph" ? React.Fragment : ChartWrapper;

  const btnClass = "p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200";

  if (message.isResponse) {
    return (
      <Message isResponse={true}>
        <Form method="post" action="/" className="relative">
          <input type="hidden" name="chartId" value={message.id} />

          <Wrapper>
            <ChartFactory chart={message} />
          </Wrapper>

          <button
            type="submit"
            className={`absolute right-4 top-4 ${btnClass}`}
          >
            {isSubmitPending ? (
              <Spinner />
            ) : (
              <Pin className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </Form>
      </Message>
    );
  }

  if (message.type === "paragraph") {
    return <Message isResponse={false}>{message.data}</Message>;
  }

  return null;
};
