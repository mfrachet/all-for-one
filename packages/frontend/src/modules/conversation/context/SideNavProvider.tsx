import { ReactNode } from "react";
import { SideNavContext } from "./SideNavContext";

export interface SideNavProviderProps {
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
}

export const SideNavProvider = ({
  children,
  onOpenChange,
}: SideNavProviderProps) => {
  return (
    <SideNavContext.Provider value={onOpenChange}>
      {children}
    </SideNavContext.Provider>
  );
};
