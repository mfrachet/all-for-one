import { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  as?: ElementType;
  to?: string;
}

export const Button = ({
  children,
  icon,
  as: Root = "button",
  ...props
}: ButtonProps) => {
  return (
    <Root
      className="bg-black rounded-3xl text-white hover:bg-gray-900 active:bg-gray-800 px-4 py-2 flex flex-row items-center gap-2"
      {...props}
    >
      {icon && <div className="[&>svg]:w-4 [&>svg]:h-4">{icon}</div>}
      {children}
    </Root>
  );
};
