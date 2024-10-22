export interface TooltipData {
  id: string | number;
  label: string;
  value: number;
  color: string;
}

export interface TooltipProps {
  datum: TooltipData;
}

export const Tooltip = ({ datum }: TooltipProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 px-2 py-1 flex flex-row items-center gap-2">
      <div
        className="w-4 h-4 rounded border-2 border-white"
        style={{ background: datum.color }}
      />

      <span className="text-xs capitalize">
        {datum.label}: <strong>{datum.value}</strong>
      </span>
    </div>
  );
};
