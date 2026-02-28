import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
import { Zap } from "lucide-react";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ModelHive | Earn From Your AI Models & Photo Datasets",
  description: "The next-generation marketplace to sell AI models, photo datasets, presets, and prompts. Keep 75–90% of every sale. Trusted by 10,000+ creators.",
  keywords: ["AI model marketplace", "LoRA marketplace", "photo dataset", "Civitai alternative", "sell AI models"],
  metadataBase: new URL("https://modelhive.co"),
  openGraph: {
    title: "ModelHive — The Creator Marketplace for AI Assets",
    description: "Sell AI models, datasets, presets & prompts. Earn 75–90% royalties. Weekly payouts.",
    url: "https://modelhive.co",
    siteName: "ModelHive",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(outfit.className, "min-h-screen flex flex-col")} style={{ background: "#0f0f0f", color: "#f1f1f1" }}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass flex justify-between items-center px-6 py-3">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 group">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 16px rgba(99,102,241,0.4)" }}>
          <Zap className="w-5 h-5 text-white" fill="white" />
        </div>
        <span className="text-xl font-bold tracking-tight indigo-gradient">ModelHive</span>
      </a>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
        <a href="/marketplace" className="hover:text-white transition-colors">Browse</a>
        <a href="/sell" className="hover:text-white transition-colors">Sell</a>
        <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
        <a href="/civitai-alternative" className="hover:text-indigo-400 transition-colors font-semibold">vs Civitai</a>
      </div>

      {/* Auth */}
      <div className="flex items-center gap-3">
        <button className="text-sm font-medium text-white/60 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5">Log in</button>
        <button className="accent-button !py-2 !px-4 text-xs uppercase tracking-widest">Start Earning</button>
      </div>
    </nav>
  )
}

function Footer() {
  const links = {
    Platform: [
      { label: "Browse Marketplace", href: "/marketplace" },
      { label: "Sell Your Assets", href: "/sell" },
      { label: "Pricing Plans", href: "/pricing" },
    ],
    Resources: [
      { label: "Civitai Alternative", href: "/civitai-alternative" },
      { label: "LoRA Marketplace", href: "/lora-marketplace" },
      { label: "Photo Datasets", href: "/photo-dataset-marketplace" },
    ],
    Company: [
      { label: "About ModelHive", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  }

  return (
    <footer className="border-t px-6 py-16" style={{ borderColor: "rgba(255,255,255,0.05)", background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}>
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-lg font-bold indigo-gradient">ModelHive</span>
          </div>
          <p className="text-white/30 text-sm leading-relaxed max-w-xs">
            The elite marketplace for AI creators. Earn 75–90% on every sale. Weekly payouts guaranteed.
          </p>
        </div>
        {Object.entries(links).map(([section, items]) => (
          <div key={section}>
            <h4 className="font-bold mb-4 text-sm text-white/80 uppercase tracking-widest">{section}</h4>
            <ul className="space-y-2.5">
              {items.map(item => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-white/40 hover:text-indigo-400 transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-16 pt-8 text-center text-xs text-white/15 uppercase tracking-widest" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        &copy; {new Date().getFullYear()} ModelHive &bull; modelhive.co &bull; Powering the AI Creator Economy
      </div>
    </footer>
  )
}
