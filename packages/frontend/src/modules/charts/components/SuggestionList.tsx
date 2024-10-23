import { Await } from "react-router-dom";
import { Tag } from "../../../components/Tag";
import { useMessages } from "../../conversation/context/useMessages";
import { SuggestionDict } from "../types";
import { Suspense } from "react";
import { Skeleton } from "../../../components/Skeleton";

export interface SuggestionListProps {
  suggestions: Promise<SuggestionDict>;
  type: "paragraph" | "lineChart" | "pieChart";
}

export const SuggestionList = ({ suggestions, type }: SuggestionListProps) => {
  const { addMessage } = useMessages();

  return (
    <Suspense
      fallback={
        <div>
          <h3 className="text-xs text-gray-500 pb-2">Suggestions</h3>
          <div className="flex flex-row gap-2 items-center">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      }
    >
      <Await resolve={suggestions}>
        {(list: SuggestionDict) => {
          if (list[type].length === 0) return null;

          return (
            <div>
              <h3 className="text-xs text-gray-500 pb-2">Suggestions</h3>
              <div className="flex flex-row gap-2 flex-wrap">
                {list[type].map((suggestion) => (
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
        }}
      </Await>
    </Suspense>
  );
};
