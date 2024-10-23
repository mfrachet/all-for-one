import { LoaderFunction, Outlet, redirect } from "react-router-dom";
import { Navbar, NavItem } from "../components/Navbar";
import { AiFeed } from "../modules/conversation/components/AiFeed";
import { Container } from "../components/Container";
import { CollapsibleSide } from "../components/CollapsibleSide";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  Menu,
  MessageCircle,
} from "lucide-react";
import { getMe } from "../modules/user/services/getMe";

export const rootLoader: LoaderFunction = async () => {
  try {
    const user = await getMe();

    return { user };
  } catch {
    return redirect("/login");
  }
};

export const DashboardRoot = () => {
  return (
    <main className="grid grid-cols-[auto_1fr] h-full">
      <CollapsibleSide
        className="h-full border-r border-gray-200 bg-gray-50 relative"
        widthClass=" w-64"
        icon={(open) => (open ? <ChevronLeftIcon /> : <Menu />)}
        iconSide="right"
        initialOpen={false}
      >
        <div className="pt-5">
          <Navbar>
            <NavItem to="/dashboard" icon={<HomeIcon />}>
              Dashboard
            </NavItem>
          </Navbar>
        </div>
      </CollapsibleSide>

      <Container>
        <div className="py-4 pl-12 pr-24">
          <Outlet />
        </div>
      </Container>

      <CollapsibleSide
        className="overflow-hidden border-l border-gray-200 h-full px-4 py-4 fixed right-0 top-0 bottom-0 bg-gray-50"
        widthClass="w-[500px]"
        icon={(open) =>
          open ? (
            <ChevronRightIcon />
          ) : (
            <MessageCircle className="text-emerald-500" />
          )
        }
      >
        <div className="pt-12 h-full">
          <AiFeed id="1" />
        </div>
      </CollapsibleSide>
    </main>
  );
};
