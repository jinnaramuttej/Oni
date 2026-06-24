# Oni — Agent Instructions

## Project Overview
Oni is an AI website builder SaaS. Users describe a website in 
a chat interface and the AI generates a complete HTML file that 
renders in a live preview iframe on the right side.

## Tech Stack
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Groq API (llama-3.3-70b-versatile) for AI generation
- No database yet — localStorage only for now

## Critical Rules — Read Before Every Change

### 1. Never use auth checks
There is NO authentication system active right now.
DELETE any of these lines wherever you find them:
  const user = await getUserFromRequest(req)
  if (!user) return new NextResponse("Unauthorized"...)
The app must work without login.

### 2. Never use mock responses
The GROQ_API_KEY is always present in .env.local.
NEVER fall back to mock/hardcoded HTML responses.
If Groq fails, return the actual error message so we can debug.
Mock responses hide real bugs.

### 3. Always use real Groq streaming
Every AI response must:
- Call https://api.groq.com/openai/v1/chat/completions
- Use model: llama-3.3-70b-versatile
- Use stream: true
- Use max_tokens: 16000
- Pipe the SSE stream directly back to the client

### 4. Environment variables
GROQ_API_KEY is server-side only — never VITE_ prefix.
Read it as: process.env.GROQ_API_KEY
After any .env.local change, restart the dev server.

### 5. SSE parsing on client
Groq streams in this exact format:
  data: {"choices":[{"delta":{"content":"token"}}]}
  data: [DONE]
Client must parse line by line, extract delta.content, 
append to fullText, update last message in real time.

### 6. ONI_CODE parsing
AI response contains website HTML wrapped in:
  <ONI_CODE>...complete HTML...</ONI_CODE>
Client extracts this with:
  response.match(/<ONI_CODE>([\s\S]*?)<\/ONI_CODE>/)
Extracted HTML goes into iframe srcDoc.
The rest of the text (without ONI_CODE block) shows in chat.

### 7. System prompt — use exactly this
const ONI_SYSTEM_PROMPT = `You are Oni, an elite AI website 
designer and builder.

For EVERY response output your thought process inside 
<ONI_THOUGHT>...</ONI_THOUGHT> tags first.

**Conversational mode**: casual messages, greetings, questions 
not about building — reply naturally in 1-2 sentences, no code.

**Build mode**: when user asks to build/create/make/design a website:
1. Output your planning/thought process inside <ONI_THOUGHT>...</ONI_THOUGHT> first, using this exact structure:
   PALETTE: [A beautiful design palette name] | [color 1 hex code], [color 2 hex code], [color 3 hex code], [color 4 hex code], [color 5 hex code]
   FONTS: [display font family name] | [body font family name] | [explanation of how these fonts fit the business tone]
   SIGNATURE: [one-sentence description of unique signature layout or interactive element]
   LAYOUT: [one-sentence description of layout design strategy]
   SECTIONS: [comma-separated list of section names/IDs to be built, e.g. navbar, hero, features, services, testimonials, contact, footer]
2. ONE short sentence (e.g. "Here's your restaurant website.")
3. Complete website in <ONI_CODE>...</ONI_CODE>

Build mode rules:
- Single HTML file, all CSS in <style>, all JS in <script>
- Import Google Fonts at top of <style>
- Custom CSS only, no Tailwind, no frameworks
- Design must look like it cost $10,000 to make
- Rich colors matching the business type
- Real content — real names, copy, prices, never placeholders
- Minimum 6 sections: navbar, hero, features, services, 
  testimonials, footer
- Hero minimum 100vh, dramatic typography minimum 80px
- CSS animations and hover effects throughout
- Mobile responsive with media queries
- No mention of Oni or AI anywhere in the output HTML
- Minimum 300 lines of HTML`

### 8. Request body format
POST /api/chat accepts:
{
  prompt: string,
  messages?: { role: string, content: string }[],
  currentHtml?: string
}

### 9. File structure — do not change these
src/app/api/chat/route.ts — Groq streaming endpoint
src/components/ui/v0-ai-chat.tsx — main chat + editor UI
src/app/page.tsx — entry point
src/lib/auth.ts — exists but NOT used for now

### 10. When something breaks
- Read the file completely before editing
- Add console.log to debug, check terminal output
- Never silently catch errors
- Never add mock fallbacks
- Show the real error

### 11. After every fix
- Restart dev server: npm run dev
- Test by typing "make a restaurant website" in the chat
- Confirm response streams word by word (not instant)
- Confirm iframe shows a real designed website
- Confirm no mock HTML like "Custom Digital Experience"