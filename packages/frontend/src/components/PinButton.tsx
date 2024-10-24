import { Pin, PinOff } from "lucide-react";
import { Spinner } from "./Spinner";
import { useCharts } from "../modules/charts/contexts/useCharts";

export interface PinButtonProps {
  isLoading: boolean;
  chartId: string;
}

const PinIcon = () => {
  return (
    <Pin className="w-4 h-4 text-gray-500 transition-all group-hover:translate-y-0.5 group-active:translate-y-1" />
  );
};

const UnpinIcon = () => {
  return <PinOff className="w-4 h-4 text-gray-500" />;
};

export const PinButton = ({ isLoading, chartId }: PinButtonProps) => {
  const { chartsDict } = useCharts();
  const Icon = chartsDict[chartId] ? UnpinIcon : PinIcon;

  return (
    <button
      type="submit"
      className={`p-2 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 active:bg-gray-300 hover:border-gray-300 active:border-gray-400 group`}
    >
      {isLoading ? <Spinner /> : <Icon />}
    </button>
  );
};
