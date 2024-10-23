import { Message } from "../../../components/Message";
import { MessageFactory } from "../../../components/MessageFactory";
import { QuestionInput } from "../../../components/QuestionInput";
import { Spinner } from "../../../components/Spinner";
import { useScrollDown } from "../../misc/hooks/useScrollDown";
import { useMessages } from "../context/useMessages";

export interface AiFeedProps {
  emptyState?: React.ReactNode;
}

export const AiFeed = ({ emptyState }: AiFeedProps) => {
  const { messages, addMessage, isPending } = useMessages();
  const containerRef = useScrollDown([messages]);

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

        {isPending && (
          <Message isResponse>
            <Spinner />
          </Message>
        )}
      </div>

      <QuestionInput
        onSubmit={(str: string) => {
          addMessage(str);
        }}
      />
    </div>
  );
};
