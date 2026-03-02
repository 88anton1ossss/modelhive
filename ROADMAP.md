# ModelHive UI Redesign Roadmap

This roadmap tracks the migration from the current ModelHive UI to the new "Gumroad + Notion + Figma" inspired workspace while preserving all existing backend logic (Supabase, Stripe, CRON, RPCs).

> Golden rule: **Do not change database schema, RPCs, or API routes unless explicitly called out.** All work here is UI/layout/UX only.

---

## Phase 0: Branch & Dependency Cleanup
**Goal:** Establish a clean, minimal UI stack for the redesign.
- [x] Create/Verify `ui-redesign` branch (Done)
- [x] Audit `package.json` for unused dependencies
- [x] Install required UI dependencies (Radix UI, motion, etc.)
- [x] Ensure `npm run build` passes on baseline

---

## Phase 1: Design Tokens & Global Styles
**Goal:** Align the app with the new Figma design language (colors, typography, radii).
- [x] Port/Define color variables (OKLCH from redesign repo)
- [x] Setup Tailwind v4 `@theme` block
- [x] Implement global typography and base styles
- [x] Setup common utility classes (glassmorphism, gradients)

---

## Phase 2: AppShell & Navigation
**Goal:** Introduce the 3-column "workspace" layout.
- [x] Implement `<AppShell>` layout component
- [x] Create Figma-style icon sidebar (`Sidebar.tsx`)
- [x] Create context-aware inspector panel
- [x] Implement mobile-responsive bottom nav
- [x] Update root layout to conditionally apply AppShell

---

## Phase 3: Marketplace Grid Redesign
**Goal:** Implement Gumroad-style cards and right-hand filters.
- [x] Implement Gumroad-style `ProductCard`
- [x] Redesign `/marketplace` page grid
- [x] Integrate workspace sidebar filters

---

## Phase 4: Product Detail Page
**Goal:** Create a Notion/Figma-style product document view.
- [x] Implement Notion-style block layout for `/products/[id]`
- [x] Port image gallery with thumbnails
- [x] Implement right-side inspector for purchase metadata
- [x] Create Share Poster generator modal

---

## Phase 5: Dashboards (Creator & Buyer)
**Goal:** Modernize dashboards into focused workspaces.
- [x] Redesign Creator Studio (`/dashboard`)
- [x] Redesign Buyer Library (`/dashboard/buyer`)
- [x] Port/Create stats cards and visualization blocks

---

## Phase 6: Link-in-bio Creator Shop (/u/[username])
**Goal:** Provide a mobile-first mini-shop for creators.
- [x] Implement mobile-first vertical shop view
- [x] Connect profile data to the mini-shop

---

## Phase 7: Command Palette & Overall Polish
**Goal:** Add power-user features and final aesthetic refinements.
- [x] Implement search command palette (⌘K)
- [x] Final polish pass on all redesigned pages
- [x] Verification of responsiveness and dark mode tokens
- [x] Update documentation and roadmap

---

## Phase 8: Backend & Schema Updates (Current Task)
**Goal:** Support new product types and creator specialized roles.
- [x] Task 1: Supabase SQL Migration (Products & Profiles)
- [x] Task 2: Update TypeScript Definitions (`src/types/product.ts`)
- [ ] Task 3: Stripe Checkout Metadata & Webhook (Royalty Split)
- [ ] Task 4: AppShell Refinement & Navigation Components

---

## Phase 9: QA & Merge Prep
- [ ] Full smoke test of auth, checkout, and dashboard flows
- [ ] Final `npm run build` verification
- [ ] Open PR from `ui-redesign` into `main`
