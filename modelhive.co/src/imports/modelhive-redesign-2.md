You are a senior product designer + front-end engineer.

Project: ModelHive — marketplace for AI models, LoRAs and photo datasets.
Tech: Next.js App Router, TypeScript, Tailwind, Supabase, Stripe (already wired, do NOT break API routes or DB schema).

GOAL
Redesign the UI into something between Gumroad + Notion + Figma:
- Minimal, elegant, creator-focused
- Feels like a creative workspace, not just a generic SaaS landing
- Works great on mobile and inside in-app browsers (Instagram, TikTok, X)

IMPORTANT CONSTRAINTS
- Keep all API routes and DB schema intact (Supabase tables: profiles, products, purchases, reviews, follows, subscriptions, royalties, etc.).
- Do not remove or rename existing server functions/endpoints; only refactor UI/layout and client components.
- Preserve business logic (purchases, royalties, subscriptions), just present it in a cleaner UI.
- Dark mode first (like current site), but keep design neutral enough for future light theme.

GLOBAL LAYOUT
Implement a consistent 3-column “workspace” layout for all authenticated pages (except SEO marketing pages like /civitai-alternative, etc.):

1) LEFT COLUMN (NAV, 72–80px wide on desktop)
- Vertical icon-only navigation (Figma-style):
  - Feed (home icon)
  - Marketplace
  - My Studio (creator dashboard)
  - Library / Purchases (buyer dashboard)
  - Earnings
  - Imports (Civitai)
  - Settings
- Tooltip labels on hover.
- On mobile: collapsible bottom nav bar with 3–4 main items (Feed, Marketplace, Studio, Profile).

2) CENTER COLUMN (MAIN CANVAS)
- Primary content: marketplace grid, dashboards, product details.
- Feels like a “canvas” area: generous padding, consistent max-width, responsive grid.

3) RIGHT COLUMN (INSPECTOR / CONTEXT PANEL)
- Context-aware side panel:
  - On marketplace: filters (base model, price, NSFW toggle, sort by AI score/downloads).
  - On product page: quick actions (Follow creator, Share, Add to collection), key meta (license, base model, last update).
  - On dashboards: stats, quick shortcuts (Create new model, Import from Civitai).

Make layout responsive:
- On tablet/mobile: collapse right column under main content.
- On very small screens: left nav becomes top/bottom bar.

HOMEPAGE / MARKETING (PUBLIC)
Redesign the root landing page to be less “generic SaaS hero” and more like a bento dashboard of what’s inside:

- Replace single giant hero with a bento grid:
  - Block: “Top earning models this week” (mini cards, earnings range, creator avatars).
  - Block: “Imported from Civitai” (carousel of models with Civitai badge).
  - Block: “For photographers / dataset creators” (copy tailored to Anton’s audience).
  - Block: “For AI artists / LoRA makers”.
  - Block: “Why ModelHive vs Civitai” — compact comparison, not a huge text wall.
- Keep clear CTAs:
  - “Start Selling Free”
  - “Browse Marketplace”
- Use a single accent color (electric violet / blurple) and lots of negative space.
- No heavy parallax; only subtle motion on scroll (opacity/translateY).

MARKETPLACE GRID ( /marketplace )
- Rebuild cards to feel like Gumroad + Figma:
  - Large cover image (16:9 or 4:5), rounded corners.
  - Small chip on top-left with base model (Flux, SDXL, etc.) and NSFW badge if needed.
  - Bottom overlay or section with:
    - Model title (ellipsized to 1–2 lines)
    - Price (or “Free” / “PWYW”)
    - AI quality score
    - Downloads count
    - Creator avatar + name
- Hover state:
  - Slight scale + shadow + border highlight.
  - Show 1 primary action: “View details”.
- Grid:
  - 3–4 columns on desktop, 2 on tablet, 1 on mobile.
  - Infinite scroll or “Load more” button at bottom.
- Filters (in right column):
  - Base model select (multi or single).
  - Price range slider (including Free).
  - Toggles: NSFW, PWYW, On sale.
  - Sort by: Trending, New, Rating, AI Score.

PRODUCT DETAIL PAGE ( /products/[id] )
Rebuild this page to feel like a Notion document + Figma inspector.

Layout:
- Center: content column.
- Right: inspector panel with purchase + meta.

Center content:
1) Top section:
   - Large responsive gallery (carousel or thumbs) of preview images.
   - Support for multiple previews with thumbnails below the main image.

2) Below gallery: block-based sections (collapsible / anchored):
   - Overview
   - How it was trained (datasets, base models, steps)
   - Recommended prompts / usage tips
   - Changelog (list of versions with dates + short notes)
   - Reviews

Implement each as a visually distinct block with:
- Title
- Body text (keep typography minimal, Notion-like)
- Optional list or code-style block for prompts.

Right inspector:
- Price + license tier selector (Personal / Commercial / Studio).
- If PWYW: show suggested price and minimum price.
- Primary CTA: Buy Now (or Download if owned).
- Secondary CTA: Follow creator, Share.
- Meta list: base model, file size, last updated, AI score, rating.
- Creator module:
  - Avatar, name, follower count.
  - “Follow / Following” button.

REVIEWS
- Show review cards with:
  - Reviewer name (or Anonymous), rating stars, text.
  - Subtle card styling, small avatar icon.
- If user purchased and hasn’t reviewed: show inline review form (stars + textarea).
- After submit: optimistic update review list.

CREATOR DASHBOARD (MY STUDIO)
Goal: feels like a Notion/Figma workspace for the creator.

Main elements:
- Overview panel (earnings summary, models count, followers, recent purchases).
- Table/grid of models:
  - Title, status (draft/active), price, downloads, last updated.
  - Quick actions per row: Edit, View, Duplicate, Share.
- “Create new model” CTA prominent at top-right.
- Side tabs or sub-nav: Models, Datasets, Earnings, Followers, Imports.

Use compact table styling with Tailwind (bordered rows, hover highlight) but still in the same dark theme.

BUYER DASHBOARD (LIBRARY)
- “Your Library” grid with all purchased models.
- Each card: cover, title, creator, last updated, quick Download button.
- Filters: by type (LoRA, dataset), by creator.
- Option to mark favorite models.

AUTH FLOWS
- Polished login/signup:
  - Social login button (Google) as primary.
  - Email/password secondary.
- Friendly copy, minimal fields.
- Redirect to:
  - New creators → My Studio onboarding.
  - Buyers → Marketplace / Library.

ANIMATION & INTERACTION
- Use framer-motion or CSS transitions for:
  - Card hover (scale, shadow, border).
  - Page transitions (fade/slide in).
  - Collapsible content blocks (height + opacity).
- No heavy parallax or long-running animations.
- Add skeleton loaders for:
  - Marketplace grid
  - Product page gallery
  - Dashboards

COMMAND PALETTE
- Implement a command palette (⌘K / Ctrl+K) using a headless component:
  - Search across models, creators, pages.
  - Basic actions: “New model”, “Go to Marketplace”, “Open My Studio”.
- Palette should be keyboard-first, Figma-style.

SOCIAL & INSTAGRAM INTEGRATION (NO DEEP API, JUST PRODUCTIZED FLOWS)
Design UI hooks and components for:

1) Share Poster Generator
   - On product page: “Generate Story Poster”.
   - Modal that shows:
     - Vertical layout mock of poster (cover, title, price, short tagline, QR / short URL).
     - Buttons: “Download PNG”, “Copy link”.
   - This does not need to fully implement image generation, but UI should be ready to integrate.

2) Link-in-bio Mini Shop
   - A public `/u/[username]` page that acts as embeddable mini-shop:
     - Grid of top N models by that creator (mobile-first vertical cards).
     - CTA: “View full shop”.
   - Clean, IG/TikTok browser friendly; no left nav, just header + grid.

3) Social proof section on product page:
   - Placeholder block “Seen on social” with space to show thumbnails of IG/TikTok content in the future.

ACCESSIBILITY & RESPONSIVENESS
- Use semantic HTML where possible.
- Ensure proper color contrast (dark background, high-contrast text).
- Focus states for buttons/links.
- Keyboard navigable command palette and menus.

IMPLEMENTATION DETAILS
- Refactor existing pages/components instead of rewriting everything from scratch, but you can create new layout components:
  - `<AppShell>` handling the 3-column workspace.
  - `<MarketplaceGrid>`, `<ProductCard>`, `<ProductInspector>`, `<BlockSection>`, `<DashboardLayout>`, etc.
- Use Tailwind for spacing/typography/shadows; keep class names readable.
- Keep all business logic (Supabase queries, RPC calls) but reorganize UI around them according to this spec.

Deliverables:
1) Updated layout components implementing the 3-column workspace.
2) Redesigned:
   - Landing page
   - Marketplace grid
   - Product detail page
   - Creator dashboard
   - Buyer library
3) Basic command palette implementation.
4) UI scaffolding for share-poster generator and link-in-bio mini shop.
