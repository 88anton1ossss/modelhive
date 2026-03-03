import { useState } from "react";
import { ProductCard } from "../components/marketplace/ProductCard";
import { MarketplaceFilters } from "../components/marketplace/MarketplaceFilters";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { GradientGrid } from "../components/GradientGrid";

// Mock data
const mockProducts = [
  {
    id: "1",
    title: "Cinematic Portrait Pro",
    price: 24.99,
    coverImage: "cinematic portrait professional",
    baseModel: "SDXL",
    aiScore: 4.8,
    downloads: 1240,
    creator: { name: "Sarah Chen", avatar: "professional photographer woman" },
    isNSFW: false,
  },
  {
    id: "2",
    title: "Architectural Render LoRA",
    price: 0,
    isPWYW: true,
    coverImage: "modern architecture rendering",
    baseModel: "Flux",
    aiScore: 4.9,
    downloads: 2340,
    creator: { name: "Mike Rodriguez", avatar: "architect man" },
    isNSFW: false,
  },
  {
    id: "3",
    title: "Fashion Dataset 2024",
    price: 49.99,
    coverImage: "fashion photography dataset",
    baseModel: "Dataset",
    aiScore: 4.7,
    downloads: 890,
    creator: { name: "Emma Liu", avatar: "fashion photographer woman" },
    isNSFW: false,
  },
  {
    id: "4",
    title: "Epic Fantasy Landscapes",
    price: 19.99,
    coverImage: "fantasy landscape mountains",
    baseModel: "SDXL",
    aiScore: 4.6,
    downloads: 1560,
    creator: { name: "Alex Turner", avatar: "digital artist" },
    isNSFW: false,
  },
  {
    id: "5",
    title: "Product Photography Pro",
    price: 34.99,
    coverImage: "product photography studio",
    baseModel: "Flux",
    aiScore: 4.9,
    downloads: 2100,
    creator: { name: "Jessica Park", avatar: "commercial photographer woman" },
    isNSFW: false,
  },
  {
    id: "6",
    title: "Anime Style LoRA",
    price: 0,
    isPWYW: false,
    coverImage: "anime art style",
    baseModel: "SDXL",
    aiScore: 4.5,
    downloads: 3200,
    creator: { name: "Yuki Tanaka", avatar: "anime artist" },
    isNSFW: false,
  },
];

export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex w-full relative">
      <GradientGrid />
      
      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Marketplace
          </h1>
          <p className="text-muted-foreground">
            Discover AI models, LoRAs, and datasets from creators worldwide
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search models, creators, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50 backdrop-blur border-pink-500/20 focus:border-pink-500/50 rounded-2xl"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-6 py-2 text-sm text-muted-foreground hover:text-foreground transition">
            Load more
          </button>
        </div>
      </div>

      {/* Right Sidebar - Filters */}
      <MarketplaceFilters />
    </div>
  );
}