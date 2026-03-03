import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Download, ExternalLink, Search, Check } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Imports() {
  const [civitaiUrl, setCivitaiUrl] = useState("");
  const [importing, setImporting] = useState(false);

  const importedModels = [
    {
      id: "1",
      title: "SDXL Base 1.0",
      originalUrl: "https://civitai.com/models/12345",
      importedDate: "2 days ago",
      status: "completed",
      downloads: 234,
    },
    {
      id: "2",
      title: "Epic Realism",
      originalUrl: "https://civitai.com/models/67890",
      importedDate: "1 week ago",
      status: "completed",
      downloads: 189,
    },
  ];

  const handleImport = () => {
    setImporting(true);
    // Simulate import
    setTimeout(() => {
      setImporting(false);
      setCivitaiUrl("");
    }, 2000);
  };

  return (
    <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Import from Civitai</h1>
        <p className="text-muted-foreground">
          Bring your existing Civitai models to ModelHive in one click
        </p>
      </div>

      {/* Import Form */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h3 className="font-semibold mb-4">Import a Model</h3>
        <div className="flex gap-3">
          <Input
            placeholder="Paste Civitai model URL..."
            value={civitaiUrl}
            onChange={(e) => setCivitaiUrl(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleImport}
            disabled={!civitaiUrl || importing}
            className="bg-violet-500 hover:bg-violet-600"
          >
            <Download className="mr-2 w-4 h-4" />
            {importing ? "Importing..." : "Import"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          We'll fetch the model details, images, and metadata. You can review and
          edit before publishing.
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-accent/50 border border-border rounded-xl p-6 mb-8">
        <h3 className="font-semibold mb-4">How it works</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-medium mb-1">Paste Civitai URL</p>
              <p className="text-sm text-muted-foreground">
                Copy the link to any Civitai model you own
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-medium mb-1">We fetch everything</p>
              <p className="text-sm text-muted-foreground">
                Title, description, images, version history—all imported automatically
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-medium mb-1">Review & publish</p>
              <p className="text-sm text-muted-foreground">
                Set your price, choose a license, and publish to ModelHive
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Imported Models */}
      <div>
        <h3 className="font-semibold mb-4">Previously Imported</h3>
        <div className="space-y-3">
          {importedModels.map((model) => (
            <div
              key={model.id}
              className="bg-card border border-border rounded-xl p-4 hover:border-violet-500/50 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{model.title}</h4>
                    <Badge
                      variant="default"
                      className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      {model.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Imported {model.importedDate}</span>
                    <span>•</span>
                    <span>{model.downloads} downloads</span>
                    <a
                      href={model.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-foreground transition"
                    >
                      View original
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Edit Listing
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {importedModels.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Download className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold mb-2">No imports yet</h3>
          <p className="text-sm text-muted-foreground">
            Paste a Civitai URL above to get started
          </p>
        </div>
      )}
    </div>
  );
}
