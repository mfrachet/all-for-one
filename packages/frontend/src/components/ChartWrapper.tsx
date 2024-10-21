import { ReactNode } from "react";

export const ChartWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="w-full h-96">{children}</div>;
};
