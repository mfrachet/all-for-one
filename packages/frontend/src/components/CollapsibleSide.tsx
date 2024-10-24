export interface CollapsibleSideProps {
  children: React.ReactNode;
  className?: string;
  widthClass: string;
  icon: React.ReactNode;
  iconSide?: "left" | "right";
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CollapsibleSide = ({
  children,
  className,
  widthClass,
  icon,
  iconSide = "left",
  open = true,
  onOpenChange,
}: CollapsibleSideProps) => {
  return (
    <div
      className={`transition-all ${className} ${open ? widthClass : "w-12"}`}
    >
      <button
        onClick={() => onOpenChange(!open)}
        className={`absolute top-4 p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 z-10 ${
          iconSide === "left" ? "left-2" : "right-2"
        }`}
      >
        <span className="[&>svg]:w-4 [&>svg]:h-4 text-gray-500">{icon}</span>
      </button>

      <div
        className={`h-full ${
          open ? "animate-fadeIn animation-delay-100" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
