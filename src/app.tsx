import { Navigate, createBrowserRouter, RouterProvider } from "react-router";

import { AppShell } from "@/components/AppShell";
import { defaultLocale } from "@/lib/locales";
import { AreaRoute } from "@/routes/area";
import { HomeRoute } from "@/routes/home";
import { TopicRoute } from "@/routes/topic";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={`/${defaultLocale}`} replace />,
  },
  {
    path: "/:locale",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomeRoute />,
      },
      {
        path: ":area",
        element: <AreaRoute />,
      },
      {
        path: ":area/:topic",
        element: <TopicRoute />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={`/${defaultLocale}`} replace />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
