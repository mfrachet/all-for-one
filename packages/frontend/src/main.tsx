import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource-variable/inter";
import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import {
  conversationIdAction,
  conversationIdLoader,
  ConversationsId,
} from "./pages/conversations.$id";
import { queryClient } from "./modules/misc/queryClient";
import { DashboardRoot, rootLoader } from "./pages/root";
import { DashboardIndex, dashboardIndexAction } from "./pages";
import { LoginPage } from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader,
    element: <DashboardRoot />,
    action: dashboardIndexAction,
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
    ],
  },
  {
    path: "/c/:id",
    loader: conversationIdLoader,
    action: conversationIdAction,
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
