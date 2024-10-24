import { createContext } from "react";

export type SideNavContextType = (open: boolean) => void;

export const SideNavContext = createContext<SideNavContextType>(
  () => undefined
);
