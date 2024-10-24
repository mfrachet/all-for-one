import { Tooltip } from "./Tooltip";

export interface TagProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Tag = ({ children, onClick }: TagProps) => {
  return (
    <Tooltip
      cta={
        <button
          type="button"
          className="shrink-0 truncate max-w-32 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full cursor-pointer border border-gray-200 hover:bg-gray-200 active:bg-gray-300 hover:border-gray-300 active:border-gray-400"
          onClick={onClick}
        >
          {children}
        </button>
      }
    >
      {children}
    </Tooltip>
  );
};
