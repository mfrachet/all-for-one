import { ChartSpline, LoaderCircle, SquarePen } from "lucide-react";
import { Message } from "../components/Message";
import { QuestionInput } from "../components/QuestionInput";
import { useRequestData } from "../hooks/useRequestData";
import { MessageEntry } from "../types";
import { useState, useRef, useEffect } from "react";
import { MessageFactory } from "../components/MessageFactory";
import { NavLink, useParams } from "react-router-dom";
import { Container } from "../components/Container";
import { nanoid } from "nanoid";

export const ConversationsId = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const [messages, setMessages] = useState<Array<MessageEntry>>([]);

  const mutation = useRequestData(id!, (response) => {
    setMessages((s) =>
      s.concat(response.map((r) => ({ ...r, isResponse: true })))
    );
  });

  useEffect(() => setMessages([]), [id]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scroll({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      <nav className="fixed top-4 w-full">
        <Container>
          <div className="flex justify-between items-center">
            <div className="font-bold flex flex-row items-center gap-2">
              <ChartSpline className="w-6 h-6" />
              All for one
            </div>
            <NavLink
              to={`/c/${nanoid()}`}
              replace
              className="bg-black rounded-3xl text-white hover:bg-gray-900 active:bg-gray-800 px-4 py-2 flex flex-row items-center gap-2"
            >
              <SquarePen className="w-4 h-4" />
              New conversation
            </NavLink>
          </div>
        </Container>
      </nav>

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
    </>
  );
};
