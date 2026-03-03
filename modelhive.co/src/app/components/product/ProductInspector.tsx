import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Download, Share2, Heart, Star, Calendar, HardDrive, TrendingUp } from "lucide-react";
import { SharePosterGenerator } from "./SharePosterGenerator";

interface ProductInspectorProps {
  product: {
    id?: string;
    title?: string;
    price: number;
    baseModel: string;
    aiScore: number;
    downloads: number;
    fileSize: string;
    lastUpdated: string;
    rating: number;
    reviews: number;
    creator: {
      name: string;
      followers: number;
      isFollowing: boolean;
    };
  };
}

export function ProductInspector({ product }: ProductInspectorProps) {
  const [selectedLicense, setSelectedLicense] = useState("personal");
  const [isFollowing, setIsFollowing] = useState(product.creator.isFollowing);

  return (
    <aside className="hidden lg:block w-96 border-l border-border p-6 overflow-y-auto sticky top-0 h-screen">
      <div className="space-y-6">
        {/* License Selector */}
        <div>
          <label className="text-sm text-muted-foreground mb-3 block">
            License Type
          </label>
          <div className="space-y-2">
            {[
              { id: "personal", label: "Personal", price: product.price },
              {
                id: "commercial",
                label: "Commercial",
                price: product.price * 2,
              },
              { id: "studio", label: "Studio", price: product.price * 4 },
            ].map((license) => (
              <button
                key={license.id}
                onClick={() => setSelectedLicense(license.id)}
                className={`w-full p-3 rounded-lg border-2 transition text-left ${
                  selectedLicense === license.id
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-border hover:border-violet-500/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{license.label}</span>
                  <span className="text-violet-400 font-semibold">
                    ${license.price.toFixed(2)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Primary CTA */}
        <Button className="w-full bg-violet-500 hover:bg-violet-600" size="lg">
          <Download className="mr-2 w-4 h-4" />
          Buy Now
        </Button>

        {/* Secondary Actions */}
        <div className="flex gap-2">
          <SharePosterGenerator
            product={{
              title: product.title || "Untitled",
              price: product.price,
              coverImage: "",
              creator: product.creator.name,
            }}
          />
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        <Separator />

        {/* Meta Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Star className="w-4 h-4" />
              Rating
            </span>
            <span className="font-medium">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Download className="w-4 h-4" />
              Downloads
            </span>
            <span className="font-medium">{product.downloads.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              AI Score
            </span>
            <span className="font-medium">{product.aiScore}/5.0</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              File Size
            </span>
            <span className="font-medium">{product.fileSize}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Updated
            </span>
            <span className="font-medium">{product.lastUpdated}</span>
          </div>
        </div>

        <Separator />

        {/* Creator Info */}
        <div>
          <label className="text-sm text-muted-foreground mb-3 block">
            Creator
          </label>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{product.creator.name}</p>
              <p className="text-sm text-muted-foreground">
                {product.creator.followers.toLocaleString()} followers
              </p>
            </div>
          </div>
          <Button
            variant={isFollowing ? "outline" : "default"}
            size="sm"
            className="w-full"
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        <Separator />

        {/* Quick Info */}
        <div className="p-4 rounded-lg bg-accent/50 space-y-2 text-sm">
          <p className="text-muted-foreground">
            ✓ Instant download after purchase
          </p>
          <p className="text-muted-foreground">
            ✓ Free updates for 1 year
          </p>
          <p className="text-muted-foreground">
            ✓ Money-back guarantee
          </p>
        </div>
      </div>
    </aside>
  );
}