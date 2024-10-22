import { ReactNode } from "react";

const classDict = {
  sm: "h-80 w-1/2",
  full: "h-96",
};

export const ChartWrapper = ({
  children,
  size = "full",
}: {
  children: ReactNode;
  size?: "sm" | "full";
}) => {
  const cl = classDict[size];
  const classnames = `overflow-hidden flex ${cl} shadow-md rounded-3xl border border-gray-100`;

  return <div className={classnames}>{children}</div>;
};
