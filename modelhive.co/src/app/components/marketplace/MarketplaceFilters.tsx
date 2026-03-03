import { useState } from "react";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { X } from "lucide-react";

export function MarketplaceFilters() {
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showNSFW, setShowNSFW] = useState(false);
  const [showPWYW, setShowPWYW] = useState(false);
  const [sortBy, setSortBy] = useState("trending");

  return (
    <aside className="hidden lg:block w-80 border-l border-border p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">Filters</h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {showFilters && (
        <div className="space-y-6">
          {/* Base Model */}
          <div>
            <Label className="mb-3 block">Base Model</Label>
            <div className="space-y-2">
              {["All", "Flux", "SDXL", "SD 1.5", "Dataset"].map((model) => (
                <label key={model} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                  />
                  <span className="text-sm">{model}</span>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <Label className="mb-3 block">Price Range</Label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100}
              step={1}
              className="mb-2"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <Separator />

          {/* Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="nsfw">Show NSFW</Label>
              <Switch
                id="nsfw"
                checked={showNSFW}
                onCheckedChange={setShowNSFW}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pwyw">Pay What You Want</Label>
              <Switch
                id="pwyw"
                checked={showPWYW}
                onCheckedChange={setShowPWYW}
              />
            </div>
          </div>

          <Separator />

          {/* Sort By */}
          <div>
            <Label className="mb-3 block">Sort By</Label>
            <RadioGroup value={sortBy} onValueChange={setSortBy}>
              <div className="space-y-2">
                {[
                  { value: "trending", label: "Trending" },
                  { value: "new", label: "New" },
                  { value: "rating", label: "Highest Rated" },
                  { value: "ai-score", label: "AI Score" },
                  { value: "downloads", label: "Most Downloads" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="cursor-pointer font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div>
            <Label className="mb-3 block">Quick Filters</Label>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 text-xs rounded-lg bg-accent hover:bg-accent/80 transition">
                Free Only
              </button>
              <button className="px-3 py-1.5 text-xs rounded-lg bg-accent hover:bg-accent/80 transition">
                On Sale
              </button>
              <button className="px-3 py-1.5 text-xs rounded-lg bg-accent hover:bg-accent/80 transition">
                Top Rated
              </button>
            </div>
          </div>

          {/* Reset Filters */}
          <button className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition">
            Reset all filters
          </button>
        </div>
      )}
    </aside>
  );
}
