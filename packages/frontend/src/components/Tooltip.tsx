import * as RTooltip from "@radix-ui/react-tooltip";

export interface TooltipProps {
  children: React.ReactNode;
  cta: React.ReactNode;
}

export const Tooltip = ({ children, cta }: TooltipProps) => {
  return (
    <RTooltip.Provider>
      <RTooltip.Root>
        <RTooltip.Trigger asChild>{cta}</RTooltip.Trigger>
        <RTooltip.Portal>
          <RTooltip.Content sideOffset={5}>
            <div className="flex flex-col items-center">
              <div className="bg-white border border-gray-200 rounded-xl px-2 py-1 text-gray-700 text-xs">
                {children}
              </div>

              <div className="bg-white h-2 w-2 border-r border-b border-gray-200 rotate-45 -translate-y-1"></div>
            </div>
          </RTooltip.Content>
        </RTooltip.Portal>
      </RTooltip.Root>
    </RTooltip.Provider>
  );
};
