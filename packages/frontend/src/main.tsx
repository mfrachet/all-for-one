import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource-variable/inter";
import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ConversationsId } from "./pages/conversations.$id";
import { queryClient } from "./modules/misc/queryClient";
import { DashboardRoot, rootLoader } from "./pages/dashboard.root";
import { DashboardIndex, dashboardIndexLoader } from "./pages/dashboard.index";
import { LoginPage } from "./pages/login";
import { saveChartAction } from "./actions/saveChartAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: null,
    loader: rootLoader,
    children: [
      {
        path: "/dashboard",
        action: saveChartAction,
        element: <DashboardRoot />,
        children: [
          {
            index: true,
            loader: dashboardIndexLoader,
            element: <DashboardIndex />,
          },
        ],
      },
      {
        path: "/c/:id",
        element: <ConversationsId />,
      },
    ],
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
