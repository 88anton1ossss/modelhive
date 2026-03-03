import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Share2, Download, Copy, Check } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface SharePosterGeneratorProps {
  product: {
    title: string;
    price: number;
    coverImage: string;
    creator: string;
  };
}

export function SharePosterGenerator({ product }: SharePosterGeneratorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Generate Story Poster
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share on Social</DialogTitle>
        </DialogHeader>

        {/* Poster Preview (9:16 vertical) */}
        <div className="aspect-[9/16] bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg overflow-hidden relative">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-40">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1234?w=400&h=700"
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-violet-600 font-bold text-xs">MH</span>
              </div>
              <span className="text-white font-semibold">ModelHive</span>
            </div>

            {/* Product Info */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
              <p className="text-white/80 mb-3">by {product.creator}</p>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-2xl font-bold">${product.price}</span>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex items-end justify-between">
              <div className="text-white/80 text-sm">
                <p>Scan to view</p>
              </div>
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">QR Code</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button className="flex-1 bg-violet-500 hover:bg-violet-600">
            <Download className="w-4 h-4 mr-2" />
            Download PNG
          </Button>
          <Button
            variant="outline"
            onClick={handleCopyLink}
            className="flex-1"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Perfect for Instagram Stories, TikTok, and X
        </p>
      </DialogContent>
    </Dialog>
  );
}
