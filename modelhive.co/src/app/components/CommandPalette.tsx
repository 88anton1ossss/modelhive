import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Home, Store, Palette, Library, TrendingUp, Download, Settings, Plus, Search } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search for models, creators, or navigate..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => handleSelect(() => navigate("/feed"))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Feed</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/marketplace"))}>
            <Store className="mr-2 h-4 w-4" />
            <span>Marketplace</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/studio"))}>
            <Palette className="mr-2 h-4 w-4" />
            <span>My Studio</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/library"))}>
            <Library className="mr-2 h-4 w-4" />
            <span>Library</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/earnings"))}>
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Earnings</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/imports"))}>
            <Download className="mr-2 h-4 w-4" />
            <span>Import from Civitai</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => handleSelect(() => alert("Create new model"))}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create New Model</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate("/marketplace"))}>
            <Search className="mr-2 h-4 w-4" />
            <span>Search Models</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
