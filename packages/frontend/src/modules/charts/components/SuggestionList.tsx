import { Tag } from "../../../components/Tag";
import { useMessages } from "../../conversation/context/useMessages";
import { Suggestion } from "../types";

export interface SuggestionListProps {
  suggestions: Suggestion[];
}

export const SuggestionList = ({ suggestions }: SuggestionListProps) => {
  const { addMessage } = useMessages();

  if (suggestions.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs text-gray-500 pb-2">Suggestions</h3>
      <div className="flex flex-row gap-2 flex-wrap">
        {suggestions.map((suggestion) => (
          <Tag
            key={suggestion.title}
            onClick={() => addMessage(suggestion.title)}
          >
            {suggestion.title}
          </Tag>
        ))}
      </div>
    </div>
  );
};
