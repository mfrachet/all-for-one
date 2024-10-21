import { LoaderCircle } from "lucide-react";
import { Message } from "../components/Message";
import { QuestionInput } from "../components/QuestionInput";
import { useRequestData } from "../hooks/useRequestData";
import { MessageEntry } from "../types";
import { useState } from "react";
import { MessageFactory } from "../components/MessageFactory";
import { useParams } from "react-router-dom";
import { Container } from "../components/Container";

export const ConversationsId = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Array<MessageEntry>>([]);

  const mutation = useRequestData(id!, (response) => {
    setMessages((s) =>
      s.concat(response.map((r) => ({ ...r, isResponse: true })))
    );
  });

  return (
    <main className="h-full flex flex-col py-4">
      <div className="flex-1 overflow-y-scroll">
        <Container>
          <h1 className="text-2xl font-bold">All for one</h1>

          <ol className="flex flex-col gap-4">
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
        </Container>
      </div>

      <Container>
        <QuestionInput
          onSubmit={(str: string) => {
            setMessages((s) => s.concat([{ type: "paragraph", data: str }]));
            mutation.mutate(str);
          }}
        />
      </Container>
    </main>
  );
};
