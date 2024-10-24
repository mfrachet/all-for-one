import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";

export const Code = ({ sqlQuery }: { sqlQuery: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="my-2">
      <button
        className="text-blue-400 cursor-pointer hover:underline text-xs flex flex-row items-center gap-1"
        onClick={toggleExpand}
      >
        <ChevronRightIcon
          className={`h-4 w-4 transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
        {isExpanded ? "Hide Query" : "Show Query"}
      </button>
      {isExpanded && (
        <pre className="bg-gray-800 text-white p-4 rounded-lg mt-2 overflow-x-auto text-sm whitespace-pre-wrap animate-fadeIn">
          <code>{sqlQuery}</code>
        </pre>
      )}
    </div>
  );
};
