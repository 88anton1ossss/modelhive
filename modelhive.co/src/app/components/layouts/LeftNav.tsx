import { NavLink, Link } from "react-router";
import {
  Home,
  Store,
  Palette,
  Library,
  TrendingUp,
  Download,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const navItems = [
  { path: "/feed", icon: Home, label: "Feed" },
  { path: "/marketplace", icon: Store, label: "Marketplace" },
  { path: "/studio", icon: Palette, label: "My Studio" },
  { path: "/library", icon: Library, label: "Library" },
  { path: "/earnings", icon: TrendingUp, label: "Earnings" },
  { path: "/imports", icon: Download, label: "Imports" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export function LeftNav() {
  const iconGradients = [
    "from-pink-500 to-purple-500",
    "from-purple-500 to-blue-500",
    "from-blue-500 to-cyan-500",
    "from-cyan-500 to-green-500",
    "from-yellow-500 to-orange-500",
    "from-orange-500 to-pink-500",
    "from-green-500 to-emerald-500",
  ];

  return (
    <nav className="hidden md:flex w-20 flex-col items-center border-r border-border/50 bg-card/30 backdrop-blur py-6 gap-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/" className="mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff6ec7] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all hover:scale-105 cursor-pointer">
                <span className="text-white font-bold text-sm">MH</span>
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20">
            <p>Home</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex flex-col gap-2 w-full px-3">
          {navItems.map((item, index) => (
            <Tooltip key={item.path}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center justify-center w-full h-12 rounded-2xl transition-all relative ${
                      isActive
                        ? `bg-gradient-to-br ${iconGradients[index % iconGradients.length]} text-white shadow-lg`
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${iconGradients[index % iconGradients.length]} rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity`} />
                      )}
                      <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'scale-110' : 'group-hover:scale-105'} transition-transform`} />
                    </>
                  )}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </nav>
  );
}