import { ReactNode } from "react";

export interface MessageProps {
  children: ReactNode;
  isResponse?: boolean;
}

export const Message = ({ children, isResponse = false }: MessageProps) => {
  if (isResponse) {
    return <div className="py-4 max-w-2xl">{children}</div>;
  }

  return (
    <div className="flex flex-col items-end w-full">
      <div className="bg-gray-100 rounded-3xl py-2 px-4">{children}</div>
    </div>
  );
};
