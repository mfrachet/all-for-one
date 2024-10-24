import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource-variable/inter";
import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ConversationsId } from "./pages/conversations.$id";
import { queryClient } from "./modules/misc/queryClient";
import { DashboardRoot, rootLoader } from "./pages/root";
import { DashboardIndex } from "./pages";
import { LoginPage } from "./pages/login";
import { pinUnpinChartAction } from "./actions/pinUnpinChartAction";

const router = createBrowserRouter([
  {
    path: "/",
    action: pinUnpinChartAction,
    loader: rootLoader,
    element: <DashboardRoot />,
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
    ],
  },
  {
    path: "/c/:id",
    element: <ConversationsId />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
