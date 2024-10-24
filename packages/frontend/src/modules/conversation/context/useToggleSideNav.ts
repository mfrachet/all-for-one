import { useContext } from "react";
import { SideNavContext } from "./SideNavContext";

export const useToggleSideNav = () => {
  return useContext(SideNavContext);
};
