import { ReactNode } from "react";

export interface ChartCardProps {
  title: ReactNode;
  children: ReactNode;
}

export const ChartCard = ({ children, title }: ChartCardProps) => {
  return (
    <div className="shadow border border-gray-200 rounded-lg shrink-0">
      <div className="pl-4 pr-4 pt-4">
        <div className="font-semibold border-b border-gray-100 pb-4 text-gray-800">
          {title}
        </div>
      </div>
      <div className="h-64">{children}</div>
    </div>
  );
};
