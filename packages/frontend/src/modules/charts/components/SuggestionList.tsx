import { Tag } from "../../../components/Tag";
import { useMessages } from "../../conversation/context/useMessages";
import { Suggestion } from "../types";
import { Skeleton } from "../../../components/Skeleton";

export interface SuggestionListProps {
  suggestions: Array<Suggestion>;
  isLoading: boolean;
}

export const SuggestionList = ({
  suggestions,
  isLoading,
}: SuggestionListProps) => {
  const { addMessage } = useMessages();

  if (isLoading)
    return (
      <div>
        <h3 className="text-xs text-gray-500 pb-2">Suggestions</h3>
        <div className="flex flex-row gap-2 items-center">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );

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
