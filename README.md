<div align="center">

# 🔥 Oni

**Advanced AI Website Builder SaaS — Describe, Synthesize, and Live-Preview.**

Oni is a high-fidelity SaaS platform that builds customized, premium websites in seconds. Users specify business details in a conversational chat interface, and the AI synthesizes complete, ready-to-use HTML/CSS/JS packages, rendered live in a split-screen, sandboxed preview.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Groq](https://img.shields.io/badge/Groq-llama--3.3--70b-orange?style=flat-square)](https://groq.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=flat-square&logo=supabase)](https://supabase.com)

</div>

---

## 🚀 Key Features

*   **Three-Stage Generation Pipeline**: Generates complex website assets in a logical stream:
    1.  **Stage 1 (Design Intent)**: Synthesizes design configuration (fonts, signatures, sections, and color palettes) inside `<ONI_THOUGHT>` tags.
    2.  **Stage 2 (Stylesheet Generation)**: Generates highly detailed, custom CSS.
    3.  **Stage 3 (HTML Body + Inline JS)**: Writes the full, semantic HTML DOM hierarchy and interactive scripts inside `<ONI_CODE>` tags.
*   **Conversational Brand Intake Flow**: If the AI detects a new website build request, it determines the industry (Restaurant, Salon, Medical, Fitness, SaaS, Portfolio, General) and prompts the user with 4-5 quick intake questions.
*   **Persistent Brand Memory**: Answers collected during the intake flow are structured and saved to the `project_brands` database. This brand metadata is injected into all subsequent refinement prompts to maintain color schemes, locations, and copy style consistency.
*   **Competitor URL Scraping**: Automatically identifies inspiration keywords and URL attachments, scrapes site content via `/api/scrape`, and feeds the design structure directly into the brand context builder.
*   **⚡ Credit Accounting**: Tracks usage via unique `visitor_id` structures, granting 50 free credits per session. Warning badges notify users on low credits, and developer tools auto-recharge credits in development mode.
*   **Dual-Database Fallback**: Fully functional database fallback system. If Supabase keys are missing in the `.env.local` file, Oni stores profiles, chats, and brand context in local JSON stores (`.data/users.json`, `.data/history.json`).
*   **Zero Auth Check Overhead**: Secure user accounts and sessions (using HMAC-SHA256 tokens) run in a decoupled mode, allowing instant workspace access without mandatory sign-ins.
*   **Premium Design Themes**: Renders premium multi-section templates (Velara, Vox, Moehr, Âme, Maison Doré) matching the caliber of custom $10,000 agencies.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | Next.js 14 (App Router, Server Actions, API routes) |
| **Language** | TypeScript 5 |
| **Styles** | Vanilla CSS + Tailwind CSS 4 for the dashboard shell |
| **Icons & Motion** | Lucide React, Framer Motion |
| **AI LLM** | Groq API — `llama-3.3-70b-versatile` (Pro) & `llama-3.1-8b-instant` (Flash) |
| **Database** | Supabase Postgres DB with Local JSON File Fallbacks |
| **Auth** | Custom cookies backed by Node.js cryptographic hashing |
| **Web Scraping** | Cheerio & Markdown Converters for competitor inspiration extraction |

---

## 📁 Directory Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signin/          # User authentication and session setup
│   │   │   ├── signup/          # User signup endpoint
│   │   │   ├── me/              # Fetch currently logged-in user profile
│   │   │   └── logout/          # Destroys cookie and logs out session
│   │   ├── brands/              # GET/POST — manages project brand context
│   │   ├── chat/
│   │   │   ├── route.ts         # POST — Groq SSE streaming endpoint
│   │   │   └── history/         # GET/POST/DELETE — history sync and storage
│   │   ├── credits/             # GET/POST — credit validation and depletion
│   │   ├── enhance-prompt/      # Refines user prompts with context enhancements
│   │   └── scrape/              # Scrapes competitor URLs for design assets
│   ├── chat/                    # Workspace interface (/chat)
│   ├── dashboard/               # Dashboard layout (/dashboard)
│   ├── signin/                  # Sign-in UI
│   ├── signup/                  # Sign-up UI
│   └── page.tsx                 # Main entry / Guest landing page
├── components/ui/
│   ├── v0-ai-chat.tsx           # Main workspace split-view builder UI
│   ├── app-shell.tsx            # Navigation sidebar and local storage synchronizer
│   ├── dashboard-shell.tsx      # Sidebar layouts for dashboard panels
│   └── sign-in.tsx              # Sign-in and signup reusable form layouts
└── lib/
    ├── auth.ts                  # Session tokens and local user store CRUD
    ├── supabase.ts              # Supabase admin client initialization
    ├── rate-limit.ts            # Sliding-window rate limiter for public routes
    └── utils.ts                 # Style concatenation and class formatting
```

---

## ⚙ Getting Started

### 1. Clone & Install Dependencies

```bash
git clone <your-repo-url>
cd oni
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# REQUIRED: Get your key from https://console.groq.com
GROQ_API_KEY=gsk_your_groq_api_key

# OPTIONAL: Configure for Supabase DB Sync
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OPTIONAL: Session signing key (Recommended)
INTERNAL_SECRET=your_32_byte_hex_string_here
```

### 3. Launch Development Server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to start designing.

---

## 🗄 Database Configuration

If you are using Supabase Postgres, execute the following SQL scripts in your Supabase database console:

```sql
-- User profiles schema
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Chat conversations table
CREATE TABLE public.chats (
  id UUID PRIMARY KEY,
  visitor_id UUID NOT NULL,
  title TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  generated_html TEXT DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX chats_visitor_id_idx ON chats (visitor_id);

-- Brand contexts table (brand memory)
CREATE TABLE public.project_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.chats(id) ON DELETE CASCADE,
  business_name TEXT,
  industry TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  tone TEXT,
  location TEXT,
  custom_answers JSONB DEFAULT '{}'::jsonb,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credits bookkeeping table
CREATE TABLE public.user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  credits_remaining INT NOT NULL DEFAULT 50,
  credits_used INT NOT NULL DEFAULT 0,
  plan TEXT,
  reset_date TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
```

---

## 🔒 Security & Sanitization

*   **Iframe Sandbox**: Code generated by the AI is loaded using an iframe with a restrictive `sandbox="allow-scripts"` setting (omitting `allow-same-origin`). This prevents custom scripts from accessing workspace local storage, parent elements, cookies, or hijacking navigations.
*   **HTML Safety Filters**: Sanitizes raw generated content before embedding, stripping infinite loops, spam interval scripts, popups, redirections, and limit-refresh loops.
*   **CSRF Checks**: Middleware validates incoming origin headers for state-changing routes (POST, DELETE, PUT, PATCH).

---

## 📝 License

Private SaaS application. All rights reserved.
