<div align="center">

# 🔥 Oni

**AI Website Builder — describe it, watch it appear.**

Oni is a SaaS AI website builder where users describe any website in a chat interface and the AI generates a complete, production-ready HTML file that renders live in a side-by-side preview — no frameworks, no editor, just vibes.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Groq](https://img.shields.io/badge/Groq-llama--3.3--70b-orange?style=flat-square)](https://groq.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=flat-square&logo=supabase)](https://supabase.com)

</div>

---

## What it does

You open Oni, type something like *"make me a luxury hotel website in dark gold"* — and within seconds you get a fully designed, multi-section website with real copy, real CSS animations, real responsive layouts. No placeholders, no lorem ipsum.

Chat with it to refine: *"make the hero taller"*, *"add a pricing section"*, *"change the color to emerald"* — and it rewrites the whole thing.

---

## Features

- **AI Website Generation** — Full single-file HTML sites generated via Groq (llama-3.3-70b-versatile) with real-time SSE streaming
- **Live Preview** — Split-pane UI with a sandboxed iframe that updates as the AI streams the response
- **Conversation Mode** — Casual messages get casual replies; build requests trigger full website generation
- **Website Editing** — Iterative refinement: send follow-up requests to modify the existing site (AI sees the current HTML)
- **Model Selection** — Switch between Oni Pro (llama-3.3-70b) and Oni Flash (llama-3.1-8b-instant)
- **File Attachments** — Upload images (PNG, JPEG, WebP, GIF, SVG, AVIF) or documents (PDF, MD, TXT, CSV, JSON, HTML, CSS, JS, TS, XLSX, and more) as context for generation
- **Chat History** — Conversations persist to Supabase in production or to a local JSON file in development; synced across devices when Supabase is configured
- **User Accounts** — Sign up / sign in with HMAC-SHA256 signed session cookies; dual-mode: Supabase Postgres or local `.data/users.json`
- **Settings Panel** — Account, billing (UI), capabilities, privacy, and general preferences
- **Dashboard** — Conversation list with sidebar navigation
- **Security** — Input sanitization with DOMPurify, banned prompt-injection tokens, strict ID validation, session expiration, and rate limiting utilities
- **Responsive Design** — Full mobile support across all pages

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) — App Router, React Server Components |
| **Language** | [TypeScript 5](https://typescriptlang.org) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) + custom CSS |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com), [Lucide React](https://lucide.dev), [Framer Motion](https://framer.motion.com) |
| **AI Model** | [Groq API](https://groq.com) — `llama-3.3-70b-versatile` (primary), `llama-3.1-8b-instant` (flash) |
| **Database** | [Supabase](https://supabase.com) (PostgreSQL) — with local JSON fallback |
| **Auth** | Custom HMAC-SHA256 session tokens via Node.js `crypto` |
| **Sanitization** | [isomorphic-dompurify](https://github.com/cure53/DOMPurify) |
| **Animations** | [Framer Motion](https://www.framer.com/motion), [motion](https://motion.dev) |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signin/          # POST — authenticate user, set session cookie
│   │   │   ├── signup/          # POST — create user account
│   │   │   ├── me/              # GET  — returns current user from session cookie
│   │   │   └── logout/          # POST — clears session cookie
│   │   ├── chat/
│   │   │   ├── route.ts         # POST — Groq SSE streaming endpoint (primary)
│   │   │   └── history/         # GET/POST — conversation persistence
│   │   ├── generate/            # POST — non-streaming generation endpoint
│   │   └── supabase/
│   │       └── profiles/        # GET  — list profiles from Supabase
│   ├── chat/                    # /chat page
│   ├── dashboard/               # /dashboard page + settings
│   ├── landing/                 # Marketing landing page
│   ├── signin/                  # Sign in page
│   ├── signup/                  # Sign up page
│   └── page.tsx                 # Entry point (redirects to home)
├── components/ui/
│   ├── v0-ai-chat.tsx           # Main chat + live preview UI (core component)
│   ├── home-page.tsx            # Homepage with file/image upload entry
│   ├── app-shell.tsx            # Authenticated app shell with sidebar
│   ├── dashboard-shell.tsx      # Dashboard layout
│   ├── settings-*.tsx           # Settings tab components
│   ├── profile-menu.tsx         # User profile dropdown
│   └── sign-in.tsx              # Sign in / sign up form component
└── lib/
    ├── auth.ts                  # Auth logic, session tokens, user CRUD
    ├── supabase.ts              # Supabase client factory (admin + browser)
    ├── rate-limit.ts            # In-memory sliding-window rate limiter
    └── utils.ts                 # Tailwind merge helper
```

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd oni
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root:

```bash
# Required — get from https://console.groq.com
GROQ_API_KEY=gsk_your_groq_api_key

# Optional — for Supabase persistence (strongly recommended for production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional — secret for signing session cookies (generate a random 32-byte hex string)
INTERNAL_SECRET=your_random_secret_here
```

> **Without Supabase:** Chat history and user accounts fall back to local `.data/*.json` files. Great for development, not suitable for production.

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Supabase Setup

If you want persistence and user accounts backed by Postgres, create these tables in your Supabase SQL editor:

```sql
-- User profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Chat history
CREATE TABLE chats (
  id UUID PRIMARY KEY,
  visitor_id UUID NOT NULL,
  title TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  generated_html TEXT DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX chats_visitor_id_idx ON chats (visitor_id);
```

---

## API Reference

### `POST /api/chat`
Main Groq streaming endpoint. Returns an SSE stream.

```json
{
  "prompt": "make a restaurant website",
  "messages": [{ "role": "user", "content": "..." }],
  "currentHtml": "<html>...</html>",
  "defaultModel": "oni-pro"
}
```

Response format (SSE):
```
data: {"choices":[{"delta":{"content":"token"}}]}
data: [DONE]
```

The full response contains `<ONI_THOUGHT>...</ONI_THOUGHT>` (internal reasoning) and `<ONI_CODE>...</ONI_CODE>` (the website HTML).

### `POST /api/auth/signin`
```json
{ "email": "user@example.com", "password": "secret123" }
```

### `POST /api/auth/signup`
```json
{ "name": "Jane", "email": "jane@example.com", "password": "secret123", "confirmPassword": "secret123" }
```

### `GET /api/auth/me`
Returns the current authenticated user from session cookie.

### `GET /api/chat/history`
Requires `x-visitor-id` header. Returns conversation list.

### `POST /api/chat/history`
Requires `x-visitor-id` header. Upserts a conversation.

---

## Environment Variable Reference

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | ✅ Yes | Groq API key for AI generation |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Supabase service role key (server-side only) |
| `INTERNAL_SECRET` | Recommended | HMAC secret for session cookie signing |

---

## Deployment

Deploy on [Vercel](https://vercel.com) — it's the simplest path:

1. Push to GitHub
2. Import the repo on Vercel
3. Add all environment variables in the Vercel project settings
4. Deploy

The app is fully serverless-compatible. No persistent server required when using Supabase.

---

## License

Private project. All rights reserved.
