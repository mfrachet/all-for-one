import { useState, useEffect } from "react";
import { Message } from "../../../components/Message";
import { MessageFactory } from "../../../components/MessageFactory";
import { QuestionInput } from "../../../components/QuestionInput";
import { Spinner } from "../../../components/Spinner";
import { AiResponseEntry } from "../../../types";
import { useScrollDown } from "../../misc/hooks/useScrollDown";
import { useSendConversationMessage } from "../hooks/useSendConversationMessage";
import { nanoid } from "nanoid";

export interface AiFeedProps {
  id: string;
  emptyState?: React.ReactNode;
}

export const AiFeed = ({ id, emptyState }: AiFeedProps) => {
  const [messages, setMessages] = useState<Array<AiResponseEntry>>([]);
  const containerRef = useScrollDown([messages]);

  const mutation = useSendConversationMessage(id!, (response) => {
    setMessages((s) =>
      s.concat(response.map((r) => ({ ...r, isResponse: true })))
    );
  });

  useEffect(() => setMessages([]), [id]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-scroll" ref={containerRef}>
        {messages.length === 0 && emptyState}

        <ol className="flex flex-col gap-4">
          {messages.map((message) => (
            <li key={message.id} className="block w-full">
              <MessageFactory message={message} />
            </li>
          ))}
        </ol>

        {mutation.isPending && (
          <Message isResponse>
            <Spinner />
          </Message>
        )}
      </div>

      <QuestionInput
        onSubmit={(str: string) => {
          setMessages((s) =>
            s.concat([{ type: "paragraph", data: str, id: nanoid() }])
          );
          mutation.mutate(str);
        }}
      />
    </div>
  );
};
