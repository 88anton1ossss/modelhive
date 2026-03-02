# ModelHive UI Redesign Roadmap

## Phase 0: Branch & Dependency Cleanup
- [ ] Create/Verify `ui-redesign` branch (Done)
- [ ] Audit `package.json` for unused dependencies
- [ ] Install required UI dependencies (Radix UI, motion, etc. as needed)
- [ ] Ensure `npm run build` passes on baseline

## Phase 1: Design Tokens & Global Styles
- [x] Port/Define color variables (OKLCH from redesign repo)
- [x] Setup Tailwind v4 `@theme` block
- [x] Implement global typography and base styles
- [x] Setup common utility classes (glassmorphism, gradients)

## Phase 2: AppShell & Navigation (3-column workspace layout)
- [x] Implement `<AppShell>` layout component
- [x] Create Figma-style icon sidebar (`Sidebar.tsx`)
- [x] Create context-aware inspector panel
- [x] Implement mobile-responsive bottom nav
- [x] Update root layout to conditionally apply AppShell

## Phase 3: Marketplace Grid Redesign
- [x] Implement Gumroad-style `ProductCard`
- [x] Redesign `/marketplace` page grid
- [x] Integrate workspace sidebar filters

## Phase 4: Product Detail Page
- [x] Implement Notion-style block layout for `/products/[id]`
- [x] Port image gallery with thumbnails
- [x] Implement right-side inspector for purchase metadata
- [x] Create Share Poster generator modal

## Phase 5: Dashboards (Creator & Buyer)
- [x] Redesign Creator Studio (`/dashboard`)
- [x] Redesign Buyer Library (`/dashboard/buyer`)
- [x] Port/Create stats cards and visualization blocks

## Phase 6: Link-in-bio Creator Shop (/u/[username])
- [x] Implement mobile-first vertical shop view
- [x] Connect profile data to the mini-shop

## Phase 7: Command Palette & Overall Polish
- [x] Implement search command palette (⌘K)
- [x] Final polish pass on all redesigned pages
- [x] Verification of responsiveness and dark mode tokens
- [x] Update documentation and roadmap

## Phase 8: QA & Merge Prep
- [ ] Full smoke test of auth, checkout, and dashboard flows
- [ ] Final `npm run build` verification
- [ ] Open PR from `ui-redesign` into `main`
