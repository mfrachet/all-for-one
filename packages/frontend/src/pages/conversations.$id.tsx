import { Message } from "../components/Message";
import { QuestionInput } from "../components/QuestionInput";
import { useRequestData } from "../hooks/useRequestData";
import { MessageEntry } from "../types";
import { useState, useEffect } from "react";
import { MessageFactory } from "../components/MessageFactory";
import { useParams } from "react-router-dom";
import { Container } from "../components/Container";
import { Navbar } from "../components/Navbar";
import { Spinner } from "../components/Spinner";
import { useScrollDown } from "../hooks/useScrollDown";

export const ConversationsId = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Array<MessageEntry>>([]);
  const containerRef = useScrollDown([messages]);

  const mutation = useRequestData(id!, (response) => {
    setMessages((s) =>
      s.concat(response.map((r) => ({ ...r, isResponse: true })))
    );
  });

  useEffect(() => setMessages([]), [id]);

  return (
    <>
      <Navbar />

      <main className="h-full flex flex-col py-4 pt-20">
        <div className="flex-1 overflow-y-scroll" ref={containerRef}>
          <Container>
            <ol className="flex flex-col gap-4">
              {messages.map((message, index) => (
                <li key={index} className="block w-full">
                  <MessageFactory message={message} />
                </li>
              ))}
            </ol>

            {mutation.isPending && (
              <Message isResponse>
                <Spinner />
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
    </>
  );
};
