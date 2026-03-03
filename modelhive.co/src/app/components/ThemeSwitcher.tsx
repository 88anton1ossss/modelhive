import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Moon, Sun, Palette } from "lucide-react";
import { motion } from "motion/react";

const colorSchemes = [
  { name: "purple", colors: ["#8b5cf6", "#a78bfa"], label: "Purple" },
  { name: "pink", colors: ["#ec4899", "#f472b6"], label: "Pink" },
  { name: "blue", colors: ["#3b82f6", "#60a5fa"], label: "Blue" },
  { name: "green", colors: ["#10b981", "#34d399"], label: "Green" },
  { name: "orange", colors: ["#f59e0b", "#fbbf24"], label: "Orange" },
] as const;

export function ThemeSwitcher() {
  const { colorScheme, setColorScheme, isDark, toggleDark } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {/* Dark mode toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDark}
        className="relative"
      >
        {isDark ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </Button>

      {/* Color scheme selector */}
      <div className="relative group">
        <Button variant="ghost" size="icon">
          <Palette className="w-4 h-4" />
        </Button>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          whileHover={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute right-0 top-full mt-2 p-3 bg-card border border-border rounded-xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50 min-w-[180px]"
        >
          <p className="text-xs font-medium mb-2 text-muted-foreground">Color Scheme</p>
          <div className="space-y-1">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.name}
                onClick={() => setColorScheme(scheme.name as any)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition ${
                  colorScheme === scheme.name ? "bg-accent" : ""
                }`}
              >
                <div className="flex gap-1">
                  <div
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ background: scheme.colors[0] }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ background: scheme.colors[1] }}
                  />
                </div>
                <span className="text-sm">{scheme.label}</span>
                {colorScheme === scheme.name && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
