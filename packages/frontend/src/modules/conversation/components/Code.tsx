import { ChevronRightIcon, ClipboardIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { formatSQL } from "../../misc/helpers/formatSql";

export const Code = ({ sqlQuery }: { sqlQuery: string }) => {
  const [html, setHtml] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    codeToHtml(formatSQL(sqlQuery), {
      lang: "sql",
      theme: "github-dark",
    }).then(setHtml);
  }, [sqlQuery]);

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
        <div className="relative pt-2">
          <pre
            className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap animate-fadeIn"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <button
            onClick={() => navigator.clipboard.writeText(sqlQuery)}
            className={` absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 p-2 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 active:bg-gray-300 hover:border-gray-300 active:border-gray-400 group`}
          >
            <ClipboardIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
