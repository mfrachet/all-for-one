import { Pin } from "lucide-react";
import { Spinner } from "./Spinner";

export interface PinButtonProps {
  isLoading: boolean;
}

export const PinButton = ({ isLoading }: PinButtonProps) => {
  return (
    <button
      type="submit"
      className={`p-2 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 active:bg-gray-300 hover:border-gray-300 active:border-gray-400 group`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Pin className="w-4 h-4 text-gray-500 transition-all group-hover:translate-y-0.5 group-active:translate-y-1" />
      )}
    </button>
  );
};
