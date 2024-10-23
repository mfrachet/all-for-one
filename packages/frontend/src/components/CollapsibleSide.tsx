import { useState } from "react";

export interface CollapsibleSideProps {
  children: React.ReactNode;

  className?: string;
  widthClass: string;
  icon: (open: boolean) => React.ReactNode;
  iconSide?: "left" | "right";
  initialOpen?: boolean;
}

export const CollapsibleSide = ({
  children,
  className,
  widthClass,
  icon,
  iconSide = "left",
  initialOpen = true,
}: CollapsibleSideProps) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div
      className={`transition-all ${className} ${open ? widthClass : "w-12"}`}
    >
      <button
        onClick={() => setOpen((s) => !s)}
        className={`absolute top-4 p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 ${
          iconSide === "left" ? "left-2" : "right-2"
        }`}
      >
        <span className="[&>svg]:w-4 [&>svg]:h-4 text-gray-500">
          {icon(open)}
        </span>
      </button>

      <div className={`h-full ${open ? "" : "hidden"}`}>{children}</div>
    </div>
  );
};
