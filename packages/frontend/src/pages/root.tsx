import {
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
} from "react-router-dom";
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
import { MessageProvider } from "../modules/conversation/context/MessageProvider";
import { SuggestionsProvider } from "../modules/charts/contexts/SuggestionsProvider";
import { ChartsProvider } from "../modules/charts/contexts/ChartsProvider";
import { AiResponseEntry } from "../types";
import { getConversation } from "../modules/conversation/services/getConversation";
import { Conversation } from "../modules/conversation/types";
import { useState } from "react";
import { SideNavProvider } from "../modules/conversation/context/SideNavProvider";

export const rootLoader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const conversationId = url.searchParams.get("c")?.toString() ?? nanoid();

    await getMe();
    const [conversation, charts] = await Promise.all([
      getConversation(conversationId || ""),
      getCharts(),
    ]);

    if (charts.length === 0) return redirect(`/c/${conversationId}`);

    return { charts, conversation };
  } catch {
    return redirect("/login");
  }
};

const EmptyConversation = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="text-gray-400 rounded-3xl p-8">
        <div
          className="text-xl font-bold py-4 text-center animate-fadeIn opacity-0"
          style={{ animationDelay: "0.5s" }}
        >
          Ask me anything about your data.
        </div>
      </div>
    </div>
  );
};
export const DashboardRoot = () => {
  const [leftSideOpen, setLeftSideOpen] = useState(false);
  const [rightSideOpen, setRightSideOpen] = useState(true);

  const { charts, conversation } = useLoaderData() as {
    charts: AiResponseEntry[];
    conversation: Conversation;
  };

  return (
    <MessageProvider conversation={conversation}>
      <ChartsProvider charts={charts}>
        <SideNavProvider onOpenChange={setRightSideOpen}>
          <SuggestionsProvider>
            <main className="grid grid-cols-[auto_1fr] h-full">
              <CollapsibleSide
                className="h-full border-r border-gray-100 relative bg-white"
                widthClass="w-64"
                icon={leftSideOpen ? <ChevronLeftIcon /> : <Menu />}
                iconSide="right"
                open={leftSideOpen}
                onOpenChange={setLeftSideOpen}
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
                widthClass="w-1/2"
                icon={
                  rightSideOpen ? (
                    <ChevronRightIcon />
                  ) : (
                    <MessageCircle className="text-emerald-500" />
                  )
                }
                open={rightSideOpen}
                onOpenChange={setRightSideOpen}
              >
                <div className="pt-12 h-full">
                  <AiFeed emptyState={<EmptyConversation />} />
                </div>
              </CollapsibleSide>
            </main>
          </SuggestionsProvider>
        </SideNavProvider>
      </ChartsProvider>
    </MessageProvider>
  );
};
