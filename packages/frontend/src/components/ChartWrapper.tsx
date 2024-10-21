import { ReactNode } from "react";

export const ChartWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-96 shadow-md rounded-xl border border-gray-100">
      {children}
    </div>
  );
};
