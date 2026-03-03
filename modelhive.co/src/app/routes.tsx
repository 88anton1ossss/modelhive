import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { AppShell } from "./components/layouts/AppShell";
import { Landing } from "./pages/Landing";
import { Marketplace } from "./pages/Marketplace";
import { ProductDetail } from "./pages/ProductDetail";
import { Studio } from "./pages/Studio";
import { Library } from "./pages/Library";
import { Earnings } from "./pages/Earnings";
import { Imports } from "./pages/Imports";
import { Settings } from "./pages/Settings";
import { Feed } from "./pages/Feed";
import { UserMiniShop } from "./pages/UserMiniShop";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/u/:username",
        element: <UserMiniShop />,
      },
      {
        element: <AppShell />,
        children: [
          { path: "/feed", element: <Feed /> },
          { path: "/marketplace", element: <Marketplace /> },
          { path: "/products/:id", element: <ProductDetail /> },
          { path: "/studio", element: <Studio /> },
          { path: "/library", element: <Library /> },
          { path: "/earnings", element: <Earnings /> },
          { path: "/imports", element: <Imports /> },
          { path: "/settings", element: <Settings /> },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);