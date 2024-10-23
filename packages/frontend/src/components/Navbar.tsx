import { ReactNode } from "react";
import { Logo } from "./Logo";
import { NavLink } from "react-router-dom";

export const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="px-4">
      <div className="px-2">
        <Logo />
      </div>

      <ul className="flex flex-col gap-4 pt-8">{children}</ul>
    </nav>
  );
};

export interface NavItemProps {
  children: React.ReactNode;
  icon: ReactNode;
  to: string;
}

export const NavItem = ({ children, to, icon }: NavItemProps) => {
  return (
    <li>
      <NavLink
        to={to}
        className="flex items-center gap-2 text-sm rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200"
      >
        <span className="[&>svg]:w-4 [&>svg]:h-4">{icon}</span>
        {children}
      </NavLink>
    </li>
  );
};
