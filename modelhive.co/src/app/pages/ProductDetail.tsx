import { useState } from "react";
import { useParams } from "react-router";
import { ProductInspector } from "../components/product/ProductInspector";
import { ProductGallery } from "../components/product/ProductGallery";
import { BlockSection } from "../components/product/BlockSection";
import { Reviews } from "../components/product/Reviews";
import { Badge } from "../components/ui/badge";
import { ChevronDown } from "lucide-react";

export function ProductDetail() {
  const { id } = useParams();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "overview",
    "training",
    "prompts",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  // Mock data
  const product = {
    id,
    title: "Cinematic Portrait Pro",
    price: 24.99,
    baseModel: "SDXL",
    aiScore: 4.8,
    downloads: 1240,
    fileSize: "2.3 GB",
    lastUpdated: "2 days ago",
    rating: 4.9,
    reviews: 89,
    creator: {
      name: "Sarah Chen",
      followers: 1234,
      isFollowing: false,
    },
    images: [
      "cinematic portrait professional lighting",
      "cinematic portrait dramatic",
      "cinematic portrait outdoor",
    ],
  };

  return (
    <div className="flex w-full">
      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a href="/marketplace" className="hover:text-foreground">
            Marketplace
          </a>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        {/* Title & Badges */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl">{product.title}</h1>
            <Badge variant="secondary">{product.baseModel}</Badge>
          </div>
          <p className="text-muted-foreground">
            by {product.creator.name} • {product.downloads} downloads
          </p>
        </div>

        {/* Gallery */}
        <ProductGallery images={product.images} />

        {/* Content Blocks */}
        <div className="mt-8 space-y-4">
          <BlockSection
            title="Overview"
            isExpanded={expandedSections.includes("overview")}
            onToggle={() => toggleSection("overview")}
          >
            <p className="text-muted-foreground leading-relaxed">
              This professional-grade LoRA is designed to generate stunning
              cinematic portraits with dramatic lighting and composition. Trained
              on over 10,000 high-quality portrait photographs from award-winning
              cinematographers.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Perfect for creating character portraits, headshots, and
              promotional imagery with a cinematic feel. Works exceptionally well
              with both male and female subjects across various ethnicities and
              age groups.
            </p>
          </BlockSection>

          <BlockSection
            title="How it was trained"
            isExpanded={expandedSections.includes("training")}
            onToggle={() => toggleSection("training")}
          >
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-violet-400 mt-1">•</span>
                <span>Base model: SDXL 1.0</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400 mt-1">•</span>
                <span>Dataset: 10,000+ curated cinematic portraits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400 mt-1">•</span>
                <span>Training steps: 50,000</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400 mt-1">•</span>
                <span>Learning rate: 1e-4 with cosine schedule</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400 mt-1">•</span>
                <span>Batch size: 4 with gradient accumulation</span>
              </li>
            </ul>
          </BlockSection>

          <BlockSection
            title="Recommended prompts"
            isExpanded={expandedSections.includes("prompts")}
            onToggle={() => toggleSection("prompts")}
          >
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-accent/50 font-mono text-sm">
                cinematic portrait, dramatic lighting, professional photography,
                shallow depth of field
              </div>
              <div className="p-3 rounded-lg bg-accent/50 font-mono text-sm">
                cinematic headshot, rim lighting, dark background, 85mm lens,
                f/1.4
              </div>
              <div className="p-3 rounded-lg bg-accent/50 font-mono text-sm">
                moody portrait, cinematic lighting, film grain, anamorphic lens
              </div>
            </div>
          </BlockSection>

          <BlockSection
            title="Changelog"
            isExpanded={expandedSections.includes("changelog")}
            onToggle={() => toggleSection("changelog")}
          >
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-medium">v1.2</span>
                  <span className="text-sm text-muted-foreground">2 days ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Improved lighting consistency and added support for outdoor
                  scenes
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-medium">v1.1</span>
                  <span className="text-sm text-muted-foreground">2 weeks ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Fixed skin tone accuracy, reduced artifacts
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-medium">v1.0</span>
                  <span className="text-sm text-muted-foreground">1 month ago</span>
                </div>
                <p className="text-sm text-muted-foreground">Initial release</p>
              </div>
            </div>
          </BlockSection>

          <Reviews productId={id || ""} />
        </div>
      </div>

      {/* Right Inspector */}
      <ProductInspector product={product} />
    </div>
  );
}
