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

import { AppShell } from "@/components/layout/AppShell";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(outfit.className, "min-h-screen flex flex-col antialiased")}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}

