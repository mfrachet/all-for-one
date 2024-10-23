import { ReactNode } from "react";

export const ChartWrapper = ({ children }: { children: ReactNode }) => {
  const classnames = `overflow-hidden flex h-96 rounded-lg border border-gray-100 bg-white`;

  return <div className={classnames}>{children}</div>;
};
