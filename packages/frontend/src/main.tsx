import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "@fontsource-variable/inter";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { ConversationsId } from "./pages/conversations.$id";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: null,
    loader: async () => {
      return redirect(`/c/${nanoid()}`);
    },
  },
  {
    path: "/c/:id",
    element: <ConversationsId />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
