export interface BigStatProps {
  title: string;
  value: string;
  color: string;
}

export const BigStat = ({ title, value, color }: BigStatProps) => {
  return (
    <div className="flex flex-row gap-2 min-w-24">
      <div
        className="h-[40px] w-1 rounded-full"
        style={{ backgroundColor: color }}
      ></div>

      <div className="flex flex-col">
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
};
