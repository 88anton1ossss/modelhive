import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Star, Download } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { unsplash_tool } from "../../utils/unsplash";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    isPWYW?: boolean;
    coverImage: string;
    baseModel: string;
    aiScore: number;
    downloads: number;
    creator: {
      name: string;
      avatar: string;
    };
    isNSFW: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  // Random gradient for each card
  const gradients = [
    "from-pink-500 to-purple-500",
    "from-purple-500 to-blue-500",
    "from-blue-500 to-cyan-500",
    "from-cyan-500 to-green-500",
    "from-yellow-500 to-orange-500",
    "from-orange-500 to-red-500",
  ];
  const gradient = gradients[parseInt(product.id) % gradients.length];
  
  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group relative bg-card/50 backdrop-blur border border-border rounded-3xl overflow-hidden hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/20 transition-all"
      >
        {/* Cover Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-accent">
          <ImageWithFallback
            src={`https://images.unsplash.com/photo-1234567890?w=400&h=500&fit=crop`}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Gradient Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity mix-blend-overlay`} />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-md border border-pink-500/20 rounded-full">
              {product.baseModel}
            </Badge>
            {product.isNSFW && (
              <Badge variant="destructive" className="bg-red-500/90 backdrop-blur-md rounded-full">
                NSFW
              </Badge>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <span className="text-sm font-medium bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              View details →
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold mb-2 truncate group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {product.price === 0 ? (product.isPWYW ? "Pay What You Want" : "Free") : `$${product.price.toFixed(2)}`}
            </span>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {product.aiScore}
              </span>
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                {product.downloads}
              </span>
            </div>
          </div>

          {/* Creator */}
          <div className="flex items-center gap-2 pt-3 border-t border-border/50">
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient}`} />
            <span className="text-xs text-muted-foreground truncate">
              {product.creator.name}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}