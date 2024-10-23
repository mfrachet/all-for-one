import { LoaderFunction, Outlet, redirect } from "react-router-dom";
import { Navbar, NavItem } from "../components/Navbar";
import { AiFeed } from "../modules/conversation/components/AiFeed";
import { CollapsibleSide } from "../components/CollapsibleSide";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  Menu,
  MessageCircle,
} from "lucide-react";
import { getMe } from "../modules/user/services/getMe";
import { getCharts } from "../modules/charts/services/getCharts";
import { nanoid } from "nanoid";

export const rootLoader: LoaderFunction = async () => {
  try {
    await getMe();
    const charts = await getCharts();

    if (charts.length === 0) return redirect(`/c/${nanoid()}`);

    return null;
  } catch {
    return redirect("/login");
  }
};

export const DashboardRoot = () => {
  return (
    <main className="grid grid-cols-[auto_1fr] h-full">
      <CollapsibleSide
        className="h-full border-r border-gray-100 relative bg-white"
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

      <div className="pt-4 pb-20 pl-12 pr-24 bg-gray-50 h-full">
        <Outlet />
      </div>

      <CollapsibleSide
        className="overflow-hidden border-l border-gray-100 h-full px-4 py-4 fixed right-0 top-0 bottom-0 bg-white"
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
