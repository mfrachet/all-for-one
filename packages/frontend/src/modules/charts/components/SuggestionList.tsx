import { Tag } from "../../../components/Tag";
import { useMessages } from "../../conversation/context/useMessages";

export interface SuggestionListProps {
  suggestions: string[];
}

export const SuggestionList = ({ suggestions }: SuggestionListProps) => {
  const { addMessage } = useMessages();

  return (
    <div>
      <h3 className="text-xs text-gray-500 pb-2">Suggestions</h3>
      <div className="flex flex-row gap-2 flex-wrap">
        {suggestions.map((suggestion) => (
          <Tag key={suggestion} onClick={() => addMessage(suggestion)}>
            {suggestion}
          </Tag>
        ))}
      </div>
    </div>
  );
};
