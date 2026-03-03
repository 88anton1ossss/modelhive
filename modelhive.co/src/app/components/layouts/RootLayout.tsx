import { Outlet } from "react-router";
import { CommandPalette } from "../CommandPalette";

export function RootLayout() {
  return (
    <>
      <CommandPalette />
      <Outlet />
    </>
  );
}
