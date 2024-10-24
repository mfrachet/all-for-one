import { useState } from "react";

export const Code = ({ sqlQuery }: { sqlQuery: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="my-2">
      <span
        className="text-blue-400 cursor-pointer hover:underline"
        onClick={toggleExpand}
      >
        {isExpanded ? "Hide Query" : "Show Query"}
      </span>
      {isExpanded && (
        <pre className="bg-gray-800 text-white p-4 rounded-lg mt-2 overflow-x-auto text-sm whitespace-pre-wrap">
          <code>{sqlQuery}</code>
        </pre>
      )}
    </div>
  );
};
