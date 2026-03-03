import { useState } from "react";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Search, Download, Heart, Package } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "motion/react";

export function Library() {
  const [searchQuery, setSearchQuery] = useState("");

  const purchasedModels = [
    {
      id: "1",
      title: "Epic Fantasy Landscapes",
      creator: "Alex Turner",
      lastUpdated: "1 week ago",
      type: "LoRA",
      coverImage: "fantasy landscape",
      isFavorite: true,
    },
    {
      id: "2",
      title: "Product Photography Pro",
      creator: "Jessica Park",
      lastUpdated: "2 weeks ago",
      type: "Model",
      coverImage: "product photography",
      isFavorite: false,
    },
    {
      id: "3",
      title: "Anime Style LoRA",
      creator: "Yuki Tanaka",
      lastUpdated: "3 weeks ago",
      type: "LoRA",
      coverImage: "anime art",
      isFavorite: true,
    },
    {
      id: "4",
      title: "Portrait Lighting Dataset",
      creator: "Sarah Chen",
      lastUpdated: "1 month ago",
      type: "Dataset",
      coverImage: "portrait lighting",
      isFavorite: false,
    },
  ];

  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Your Library</h1>
        <p className="text-muted-foreground">
          Access all your purchased models and datasets
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search your library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            All Types
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            Favorites
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedModels.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-violet-500/50 hover:shadow-lg transition-all group"
          >
            {/* Cover */}
            <div className="relative aspect-video bg-accent overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1234?w=600&h=400"
                alt={model.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {model.isFavorite && (
                <div className="absolute top-3 right-3">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate mb-1">{model.title}</h3>
                  <p className="text-sm text-muted-foreground">by {model.creator}</p>
                </div>
                <Badge variant="secondary" className="ml-2">
                  {model.type}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  Updated {model.lastUpdated}
                </span>
                <Button size="sm" variant="outline">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State (conditionally shown) */}
      {purchasedModels.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold mb-2">Your library is empty</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Browse the marketplace to find models and datasets
          </p>
          <Button variant="outline" asChild>
            <a href="/marketplace">Browse Marketplace</a>
          </Button>
        </div>
      )}
    </div>
  );
}