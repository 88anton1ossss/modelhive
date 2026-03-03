import { useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ExternalLink, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function UserMiniShop() {
  const { username } = useParams();

  const creator = {
    name: "Sarah Chen",
    username: "sarahchen",
    bio: "Professional photographer & AI artist",
    avatar: "",
    followers: 1234,
  };

  const topModels = [
    {
      id: "1",
      title: "Cinematic Portrait Pro",
      price: 24.99,
      rating: 4.8,
      downloads: 1240,
      coverImage: "",
    },
    {
      id: "2",
      title: "Architectural Render LoRA",
      price: 19.99,
      rating: 4.9,
      downloads: 890,
      coverImage: "",
    },
    {
      id: "3",
      title: "Portrait Lighting Dataset",
      price: 34.99,
      rating: 4.7,
      downloads: 560,
      coverImage: "",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">MH</span>
              </div>
              <span className="font-semibold">ModelHive</span>
            </div>
            <Button size="sm" variant="outline" asChild>
              <a href="/">
                <ExternalLink className="w-3 h-3 mr-2" />
                Visit Site
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Creator Profile */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold mb-2">{creator.name}</h1>
          <p className="text-muted-foreground mb-3">@{creator.username}</p>
          <p className="text-sm text-muted-foreground mb-4">{creator.bio}</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="text-muted-foreground">
              {creator.followers.toLocaleString()} followers
            </span>
          </div>
        </div>

        {/* Models Grid */}
        <div className="space-y-4 mb-8">
          <h2 className="font-semibold">Top Models</h2>
          <div className="space-y-3">
            {topModels.map((model) => (
              <a
                key={model.id}
                href={`/products/${model.id}`}
                className="block bg-card border border-border rounded-xl overflow-hidden hover:border-violet-500/50 transition"
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="w-20 h-20 rounded-lg bg-accent flex-shrink-0">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1234?w=200&h=200"
                      alt={model.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-1 truncate">{model.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        {model.rating}
                      </span>
                      <span>•</span>
                      <span>{model.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-violet-400">
                      ${model.price}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild className="bg-violet-500 hover:bg-violet-600">
            <a href={`/u/${username}`}>View Full Shop</a>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-2xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Powered by <span className="text-foreground font-semibold">ModelHive</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
