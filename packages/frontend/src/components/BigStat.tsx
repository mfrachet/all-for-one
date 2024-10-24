export interface BigStatProps {
  title: string;
  value: string;
  color: string;
}

export const BigStat = ({ title, value, color }: BigStatProps) => {
  return (
    <div className="flex flex-row gap-2 min-w-24 bg-white rounded-lg overflow-hidden border border-gray-100">
      <div
        className="w-1 rounded-full"
        style={{ backgroundColor: color }}
      ></div>

      <div className="flex flex-col px-4 py-2">
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
};
