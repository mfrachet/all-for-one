import { LoaderCircle } from "lucide-react";

import { Message } from "../components/Message";
import { QuestionInput } from "../components/QuestionInput";
import { useRequestData } from "../hooks/useRequestData";
import { OutputEntry } from "../types";
import { useState } from "react";
import { MessageFactory } from "../components/MessageFactory";

export const IndexPage = () => {
  const [messages, setMessages] = useState<
    (OutputEntry & { isResponse?: boolean })[]
  >([]);
  const mutation = useRequestData((response) => {
    setMessages((s) =>
      s.concat(response.map((r) => ({ ...r, isResponse: true })))
    );
  });

  return (
    <main className="h-full max-w-3xl mx-auto">
      <div className="h-full flex flex-col py-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">All for one</h1>

          <ol>
            {messages.map((message, index) => (
              <li key={index} className="block w-full">
                <MessageFactory message={message} />
              </li>
            ))}
          </ol>

          {mutation.isPending && (
            <Message isResponse>
              <LoaderCircle className="w-6 h-6 animate-spin" />
            </Message>
          )}
        </div>

        <QuestionInput
          onSubmit={(str: string) => {
            setMessages((s) => s.concat([{ type: "paragraph", data: str }]));
            mutation.mutate(str);
          }}
        />
      </div>
    </main>
  );
};
