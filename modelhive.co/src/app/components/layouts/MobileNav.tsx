import { NavLink } from "react-router";
import { Home, Store, Palette, User, Sparkles } from "lucide-react";

const navItems = [
  { path: "/", icon: Sparkles, label: "Home" },
  { path: "/feed", icon: Home, label: "Feed" },
  { path: "/marketplace", icon: Store, label: "Market" },
  { path: "/studio", icon: Palette, label: "Studio" },
  { path: "/settings", icon: User, label: "Profile" },
];

export function MobileNav() {
  const iconGradients = [
    "from-pink-500 to-purple-500",
    "from-purple-500 to-blue-500",
    "from-blue-500 to-cyan-500",
    "from-cyan-500 to-green-500",
    "from-yellow-500 to-orange-500",
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden border-t border-border/50 bg-card/95 backdrop-blur-lg z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all relative ${
                isActive
                  ? ""
                  : "text-muted-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${iconGradients[index % iconGradients.length]} rounded-2xl opacity-10`} />
                    <div className={`absolute inset-0 bg-gradient-to-br ${iconGradients[index % iconGradients.length]} rounded-2xl blur-md opacity-20`} />
                  </>
                )}
                <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'scale-110' : ''} transition-transform`} 
                  style={isActive ? {
                    filter: 'drop-shadow(0 0 8px rgba(255, 110, 199, 0.5))'
                  } : {}} 
                />
                <span className={`text-xs relative z-10 ${isActive ? 'font-medium bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent' : ''}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}