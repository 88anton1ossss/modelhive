import { motion } from "motion/react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Heart, MessageCircle, Share2, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { GumroadCard } from "../components/GumroadCard";
import { GradientGrid } from "../components/GradientGrid";

export function Feed() {
  const feedItems = [
    {
      id: "1",
      type: "model_release",
      creator: { name: "Sarah Chen", avatar: "" },
      title: "Just released: Cinematic Portrait Pro v1.2",
      description: "Improved lighting consistency and outdoor scene support",
      image: "cinematic portrait",
      likes: 234,
      comments: 18,
      timestamp: "2 hours ago",
      gradient: "pink-purple" as const,
    },
    {
      id: "2",
      type: "achievement",
      creator: { name: "Mike Rodriguez", avatar: "" },
      title: "Hit 1,000 downloads! 🎉",
      description: "Architectural Render LoRA just crossed 1k downloads. Thank you all!",
      image: "architecture render",
      likes: 189,
      comments: 24,
      timestamp: "5 hours ago",
      gradient: "purple-blue" as const,
    },
    {
      id: "3",
      type: "showcase",
      creator: { name: "Emma Liu", avatar: "" },
      title: "Fashion Dataset 2024 - Preview",
      description: "Sneak peek at the upcoming fashion photography dataset",
      image: "fashion photography",
      likes: 156,
      comments: 12,
      timestamp: "1 day ago",
      gradient: "blue-cyan" as const,
    },
  ];

  return (
    <div className="flex-1 p-6 md:p-8 max-w-3xl mx-auto w-full relative">
      <GradientGrid />
      
      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          Feed
        </h1>
        <p className="text-muted-foreground">
          Updates from creators you follow
        </p>
      </div>

      {/* Feed Items */}
      <div className="space-y-6 relative z-10">
        {feedItems.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-violet-500/50 transition"
          >
            {/* Header */}
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600" />
              <div className="flex-1">
                <p className="font-medium">{item.creator.name}</p>
                <p className="text-xs text-muted-foreground">{item.timestamp}</p>
              </div>
              <Badge variant="secondary">{item.type.replace("_", " ")}</Badge>
            </div>

            {/* Content */}
            <div className="px-4 pb-4">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
            </div>

            {/* Image */}
            {item.image && (
              <div className="aspect-video bg-accent">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1234?w=800&h=450"
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Actions */}
            <div className="p-4 flex items-center gap-6 border-t border-border">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
                <Heart className="w-4 h-4" />
                <span>{item.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
                <MessageCircle className="w-4 h-4" />
                <span>{item.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition ml-auto">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button variant="outline">Load more posts</Button>
      </div>
    </div>
  );
}