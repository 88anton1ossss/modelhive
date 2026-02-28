# ModelHive

> **The creator marketplace for AI models, LoRAs, photo datasets, presets, and prompts.**
> Keep 75–90% of every sale. Weekly automated payouts. AI quality-verified.

🌐 **[modelhive.co](https://modelhive.co)** &nbsp;·&nbsp; ⚡ Civitai Alternative that Actually Pays You

---

## Features

- 🤖 **AI Model Marketplace** — Sell Flux, SDXL, SD3.5, Pony LoRAs with quality scoring
- 📸 **Photo Datasets** — License-tagged, AI-scored datasets for AI training
- 💰 **75–90% Creator Royalties** — Automatic splits via Stripe Connect
- 📅 **Weekly Payouts** — Every Friday, directly to your bank
- 🔐 **Secure Downloads** — Cloudflare R2 private storage + signed URLs (24hr)
- 🖼️ **Auto Watermarked Previews** — 10 free previews generated on upload
- 🧠 **AI Quality Scoring** — OpenAI Vision rates every upload (0–100)
- 🔄 **Civitai Import** — Migrate your entire Civitai profile in one click
- 🔞 **NSFW Age Gate** — Controlled adult content with age verification
- 📊 **Subscription Tiers** — Free (25% fee) / Pro $19 (15%) / Studio $49 (10%)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), Tailwind CSS, Framer Motion |
| Auth | Supabase (Email + Google OAuth) |
| Database | Supabase (PostgreSQL + RLS) |
| File Storage | Cloudflare R2 (public previews + private master files) |
| Payments | Stripe Connect (automatic splits) |
| AI Scoring | OpenAI Vision API (GPT-4V) |
| Image Processing | Sharp (watermarking + resizing) |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/anton1os/modelhive.git
cd modelhive
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Fill in your Supabase, Stripe, R2, and OpenAI credentials
```

### 3. Run the database migrations

In your Supabase dashboard → SQL Editor, run:
- `supabase/schema.sql` — Main tables + RLS policies
- `supabase/rpc.sql` — Stored procedures
- `supabase/subscriptions.sql` — Subscription tier support

### 4. Run the development server

```bash
# Requires Node.js v20+
nvm use 20
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

See [`.env.example`](./.env.example) for all required variables.

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `R2_ACCOUNT_ID` | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | R2 access key |
| `R2_SECRET_ACCESS_KEY` | R2 secret key |
| `OPENAI_API_KEY` | OpenAI API key |

---

## SEO Pages

- `/civitai-alternative` — Why creators switch from Civitai
- `/lora-marketplace` — Browse by base model (Flux, SDXL, etc.)
- `/photo-dataset-marketplace` — AI training photo sets
- `/earn-from-ai-models` — Creator income calculator

---

## License

MIT © ModelHive
