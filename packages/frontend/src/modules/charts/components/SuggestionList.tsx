import { Tag } from "../../../components/Tag";

export interface SuggestionListProps {
  suggestions: string[];
}

export const SuggestionList = ({ suggestions }: SuggestionListProps) => {
  return (
    <div>
      <h3 className="text-xs text-gray-500 pb-2">Suggestions</h3>
      <div className="flex flex-row gap-2 flex-wrap">
        {suggestions.map((suggestion) => (
          <Tag key={suggestion}>{suggestion}</Tag>
        ))}
      </div>
    </div>
  );
};
