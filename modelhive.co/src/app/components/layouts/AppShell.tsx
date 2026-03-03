import { Outlet } from "react-router";
import { LeftNav } from "./LeftNav";
import { MobileNav } from "./MobileNav";

export function AppShell() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Navigation - Desktop only */}
      <LeftNav />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
