# Color Palettes — Oni Knowledge Base

## Core Color Theory
- Use the 60/30/10 rule: 60% background/neutral, 30% secondary, 10% accent
- Never use pure black (#000) — use #0A0A0A or #111111 instead
- Never use pure white (#FFF) for body text on dark — use #F0F0F0 or rgba(255,255,255,0.9)
- Accent colors should be saturated and vibrant on dark backgrounds
- Maximum 3 colors per design — restraint is premium
- Always define colors as CSS custom properties, never hardcode hex values inline

---

## How to Pick Colors for Any Business
1. What emotion should the site create? (trust, luxury, energy, calm)
2. What industry conventions exist? (medical = blue/teal, restaurant = warm/red)
3. What is the background darkness level? (dark theme vs light theme)
4. Pick ONE primary accent — make it vibrant and memorable
5. Pick ONE complementary secondary — supports the primary
6. Everything else is neutral (dark bg, light bg, text colors)

---

## 1. Fine Dining Restaurant / Luxury Food

```css
:root {
  --bg: #120A08;
  --bg-2: #1A0F0C;
  --bg-3: #231512;
  --primary: #D4AF37;      /* rich gold */
  --secondary: #8B1A1A;    /* deep burgundy */
  --accent: #D4AF37;
  --light: #FDF8F0;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(212,175,55,0.12);
  --border-hover: rgba(212,175,55,0.25);
  --grad: linear-gradient(135deg, #D4AF37, #B8860B);
}
```
Mood: Luxurious, intimate, warm, sophisticated
Real brands: Nobu, Eleven Madison Park, The French Laundry

---

## 2. Casual Bistro / Modern Cafe

```css
:root {
  --bg: #1C1410;
  --bg-2: #241A14;
  --bg-3: #2E211A;
  --primary: #E07B39;      /* warm orange */
  --secondary: #C4956A;    /* caramel */
  --accent: #E07B39;
  --light: #FFF8F0;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(224,123,57,0.12);
  --border-hover: rgba(224,123,57,0.25);
  --grad: linear-gradient(135deg, #E07B39, #C4956A);
}
```
Mood: Warm, approachable, cozy, inviting
Real brands: Starbucks, Blue Bottle Coffee, Joe Coffee

---

## 3. Coffee Shop / Specialty Coffee

```css
:root {
  --bg: #0F0B08;
  --bg-2: #1A1410;
  --bg-3: #241E18;
  --primary: #C8956C;      /* coffee cream */
  --secondary: #6B4226;    /* espresso brown */
  --accent: #C8956C;
  --light: #FFF9F5;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(200,149,108,0.12);
  --border-hover: rgba(200,149,108,0.25);
  --grad: linear-gradient(135deg, #C8956C, #6B4226);
}
```
Mood: Artisanal, warm, crafted, premium
Real brands: Intelligentsia, Onyx Coffee, Verve

---

## 4. Luxury Hotel / 5-Star Resort

```css
:root {
  --bg: #060C14;
  --bg-2: #0A1420;
  --bg-3: #0F1E30;
  --primary: #D4AF37;      /* gold */
  --secondary: #1E4D8C;    /* deep navy */
  --accent: #D4AF37;
  --light: #F5F5F0;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(212,175,55,0.12);
  --border-hover: rgba(212,175,55,0.25);
  --grad: linear-gradient(135deg, #D4AF37, #C9A227);
}
```
Mood: Ultra premium, trustworthy, sophisticated, timeless
Real brands: Four Seasons, Aman, Ritz Carlton

---

## 5. Boutique Hotel / Design Hotel

```css
:root {
  --bg: #0A0A0C;
  --bg-2: #121215;
  --bg-3: #1A1A1F;
  --primary: #9B8EC4;      /* soft lavender */
  --secondary: #C4956A;    /* warm bronze */
  --accent: #9B8EC4;
  --light: #F8F5FF;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(155,142,196,0.12);
  --border-hover: rgba(155,142,196,0.25);
  --grad: linear-gradient(135deg, #9B8EC4, #C4956A);
}
```
Mood: Artistic, unique, curated, editorial
Real brands: The Standard, Ace Hotel, 21c Museum Hotels

---

## 6. Tech SaaS / Startup

```css
:root {
  --bg: #080812;
  --bg-2: #0F0F1E;
  --bg-3: #161628;
  --primary: #7C3AED;      /* electric violet */
  --secondary: #06B6D4;    /* cyan */
  --accent: #7C3AED;
  --light: #F8F8FF;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(124,58,237,0.15);
  --border-hover: rgba(124,58,237,0.30);
  --grad: linear-gradient(135deg, #7C3AED, #06B6D4);
}
```
Mood: Innovative, modern, cutting-edge, trustworthy
Real brands: Linear, Vercel, Supabase, Raycast

---

## 7. Enterprise Software / B2B SaaS

```css
:root {
  --bg: #050A14;
  --bg-2: #0A1020;
  --bg-3: #0F1828;
  --primary: #3B82F6;      /* professional blue */
  --secondary: #1D4ED8;    /* deep blue */
  --accent: #60A5FA;
  --light: #F0F7FF;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(59,130,246,0.15);
  --border-hover: rgba(59,130,246,0.30);
  --grad: linear-gradient(135deg, #3B82F6, #1D4ED8);
}
```
Mood: Professional, reliable, trustworthy, corporate
Real brands: Salesforce, HubSpot, Stripe, Notion

---

## 8. AI Product / Futuristic Tech

```css
:root {
  --bg: #020208;
  --bg-2: #06060F;
  --bg-3: #0A0A18;
  --primary: #A78BFA;      /* soft purple */
  --secondary: #34D399;    /* emerald */
  --accent: #A78BFA;
  --light: #F5F3FF;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(167,139,250,0.12);
  --border-hover: rgba(167,139,250,0.25);
  --grad: linear-gradient(135deg, #A78BFA, #34D399);
}
```
Mood: Futuristic, intelligent, mysterious, powerful
Real brands: Anthropic, OpenAI, Midjourney, Runway

---

## 9. Fitness / Gym

```css
:root {
  --bg: #080808;
  --bg-2: #101010;
  --bg-3: #181818;
  --primary: #00FF87;      /* electric green */
  --secondary: #00CC6A;    /* darker green */
  --accent: #00FF87;
  --light: #F0FFF4;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(0,255,135,0.12);
  --border-hover: rgba(0,255,135,0.25);
  --grad: linear-gradient(135deg, #00FF87, #00CC6A);
}
```
Mood: Energetic, powerful, motivating, intense
Real brands: Nike Training, Peloton, Mirror, Barry's

---

## 10. Yoga / Wellness / Mindfulness

```css
:root {
  --bg: #0A0F0A;
  --bg-2: #121812;
  --bg-3: #1A221A;
  --primary: #7EC8A0;      /* sage green */
  --secondary: #C4956A;    /* warm sand */
  --accent: #7EC8A0;
  --light: #F0FFF4;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(126,200,160,0.12);
  --border-hover: rgba(126,200,160,0.25);
  --grad: linear-gradient(135deg, #7EC8A0, #C4956A);
}
```
Mood: Calm, natural, grounding, peaceful
Real brands: Calm, Headspace, Alo Yoga, lululemon

---

## 11. Beauty Salon / Hair Studio

```css
:root {
  --bg: #120A0F;
  --bg-2: #1A0F16;
  --bg-3: #22141C;
  --primary: #FF6B9D;      /* rose pink */
  --secondary: #C9956B;    /* rose gold */
  --accent: #FF6B9D;
  --light: #FFF5F8;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(255,107,157,0.12);
  --border-hover: rgba(255,107,157,0.25);
  --grad: linear-gradient(135deg, #FF6B9D, #C9956B);
}
```
Mood: Feminine, luxurious, glamorous, elegant
Real brands: Drybar, Glamsquad, Glossier, Charlotte Tilbury

---

## 12. Skincare / Cosmetics Brand

```css
:root {
  --bg: #0F0A08;
  --bg-2: #18120F;
  --bg-3: #201A16;
  --primary: #D4A5A5;      /* dusty rose */
  --secondary: #8B6F6F;    /* mauve */
  --accent: #D4A5A5;
  --light: #FFF8F5;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(212,165,165,0.12);
  --border-hover: rgba(212,165,165,0.25);
  --grad: linear-gradient(135deg, #D4A5A5, #8B6F6F);
}
```
Mood: Clean, pure, elegant, sophisticated
Real brands: La Mer, SK-II, Tatcha, Aesop

---

## 13. Real Estate Luxury

```css
:root {
  --bg: #080C08;
  --bg-2: #0F150F;
  --bg-3: #161E16;
  --primary: #C9A84C;      /* warm gold */
  --secondary: #2D5A27;    /* forest green */
  --accent: #C9A84C;
  --light: #F5FFF5;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(201,168,76,0.12);
  --border-hover: rgba(201,168,76,0.25);
  --grad: linear-gradient(135deg, #C9A84C, #2D5A27);
}
```
Mood: Premium, trustworthy, established, prestigious
Real brands: Sotheby's Realty, Christie's Real Estate, Compass

---

## 14. Medical / Healthcare

```css
:root {
  --bg: #060C18;
  --bg-2: #0A1420;
  --bg-3: #0F1E2E;
  --primary: #0EA5E9;      /* sky blue */
  --secondary: #0369A1;    /* ocean blue */
  --accent: #38BDF8;
  --light: #F0F9FF;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(14,165,233,0.15);
  --border-hover: rgba(14,165,233,0.30);
  --grad: linear-gradient(135deg, #0EA5E9, #0369A1);
}
```
Mood: Clean, trustworthy, professional, caring
Real brands: Mayo Clinic, Cleveland Clinic, Teladoc

---

## 15. Dental Practice

```css
:root {
  --bg: #080F18;
  --bg-2: #0C1520;
  --bg-3: #101C28;
  --primary: #06B6D4;      /* teal */
  --secondary: #0891B2;    /* darker teal */
  --accent: #22D3EE;
  --light: #F0FFFE;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(6,182,212,0.15);
  --border-hover: rgba(6,182,212,0.30);
  --grad: linear-gradient(135deg, #06B6D4, #0891B2);
}
```
Mood: Clean, fresh, professional, approachable
Real brands: Tend, Aspen Dental, Smile Direct Club

---

## 16. Education / Online Tutoring

```css
:root {
  --bg: #08080F;
  --bg-2: #10101A;
  --bg-3: #181825;
  --primary: #F59E0B;      /* amber */
  --secondary: #7C3AED;    /* purple */
  --accent: #F59E0B;
  --light: #FFFBEB;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(245,158,11,0.12);
  --border-hover: rgba(245,158,11,0.25);
  --grad: linear-gradient(135deg, #F59E0B, #7C3AED);
}
```
Mood: Inspiring, energetic, focused, optimistic
Real brands: Khan Academy, Duolingo, Coursera, Masterclass

---

## 17. Creative Agency / Portfolio

```css
:root {
  --bg: #060606;
  --bg-2: #0F0F0F;
  --bg-3: #181818;
  --primary: #8B5CF6;      /* purple */
  --secondary: #14B8A6;    /* teal */
  --accent: #8B5CF6;
  --light: #FAFAFA;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.55);
  --text-subtle: rgba(255,255,255,0.22);
  --border: rgba(139,92,246,0.12);
  --border-hover: rgba(139,92,246,0.25);
  --grad: linear-gradient(135deg, #8B5CF6, #14B8A6);
}
```
Mood: Creative, bold, modern, distinctive
Real brands: Fantasy Interactive, Huge Inc, R/GA

---

## 18. Freelancer Portfolio

```css
:root {
  --bg: #0A0A0A;
  --bg-2: #141414;
  --bg-3: #1E1E1E;
  --primary: #F0F0F0;      /* near white */
  --secondary: #888888;    /* gray */
  --accent: #FF4D4D;       /* red accent */
  --light: #F5F5F5;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.55);
  --text-subtle: rgba(255,255,255,0.22);
  --border: rgba(255,255,255,0.08);
  --border-hover: rgba(255,255,255,0.15);
  --grad: linear-gradient(135deg, #FFFFFF, #888888);
}
```
Mood: Minimal, confident, clean, professional
Real brands: Stripe.dev, Linear docs, personal brand sites

---

## 19. E-commerce Fashion

```css
:root {
  --bg: #0A0808;
  --bg-2: #140E0E;
  --bg-3: #1E1515;
  --primary: #E8C4A0;      /* champagne */
  --secondary: #8B5E3C;    /* cognac */
  --accent: #E8C4A0;
  --light: #FFF8F0;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(232,196,160,0.12);
  --border-hover: rgba(232,196,160,0.25);
  --grad: linear-gradient(135deg, #E8C4A0, #8B5E3C);
}
```
Mood: Luxurious, editorial, aspirational, refined
Real brands: Net-a-Porter, Farfetch, SSENSE

---

## 20. Law Firm / Legal Services

```css
:root {
  --bg: #080808;
  --bg-2: #101010;
  --bg-3: #181818;
  --primary: #C9A84C;      /* gold */
  --secondary: #2A2A2A;    /* charcoal */
  --accent: #C9A84C;
  --light: #F5F5F0;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(201,168,76,0.12);
  --border-hover: rgba(201,168,76,0.25);
  --grad: linear-gradient(135deg, #C9A84C, #A07830);
}
```
Mood: Authoritative, trustworthy, established, serious
Real brands: White & Case, Sullivan & Cromwell, Cravath

---

## 21. Architecture / Interior Design

```css
:root {
  --bg: #0A0A08;
  --bg-2: #141410;
  --bg-3: #1E1E18;
  --primary: #D4C5A9;      /* warm stone */
  --secondary: #8B7355;    /* warm brown */
  --accent: #D4C5A9;
  --light: #FAFAF5;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(212,197,169,0.12);
  --border-hover: rgba(212,197,169,0.25);
  --grad: linear-gradient(135deg, #D4C5A9, #8B7355);
}
```
Mood: Sophisticated, minimal, timeless, curated
Real brands: Zaha Hadid Architects, Foster + Partners, MVRDV

---

## 22. Photography Studio

```css
:root {
  --bg: #080808;
  --bg-2: #0F0F0F;
  --bg-3: #181818;
  --primary: #F5F5F5;      /* near white */
  --secondary: #666666;    /* medium gray */
  --accent: #FFD700;       /* golden yellow */
  --light: #FFFFFF;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.55);
  --text-subtle: rgba(255,255,255,0.22);
  --border: rgba(255,255,255,0.08);
  --border-hover: rgba(255,255,255,0.15);
  --grad: linear-gradient(135deg, #F5F5F5, #999999);
}
```
Mood: Artistic, dramatic, editorial, bold
Real brands: Annie Leibovitz Studio, Magnum Photos

---

## 23. Event Planning / Wedding

```css
:root {
  --bg: #0F0A0E;
  --bg-2: #180F18;
  --bg-3: #201520;
  --primary: #E8B4D0;      /* blush pink */
  --secondary: #C9A84C;    /* champagne gold */
  --accent: #E8B4D0;
  --light: #FFF5FC;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(232,180,208,0.12);
  --border-hover: rgba(232,180,208,0.25);
  --grad: linear-gradient(135deg, #E8B4D0, #C9A84C);
}
```
Mood: Romantic, elegant, celebratory, dreamy
Real brands: Zola, The Knot, Junebug Weddings

---

## 24. Accounting / Finance

```css
:root {
  --bg: #060810;
  --bg-2: #0A0E18;
  --bg-3: #0F1420;
  --primary: #22C55E;      /* green */
  --secondary: #16A34A;    /* darker green */
  --accent: #4ADE80;
  --light: #F0FFF4;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(34,197,94,0.15);
  --border-hover: rgba(34,197,94,0.30);
  --grad: linear-gradient(135deg, #22C55E, #16A34A);
}
```
Mood: Growth, stability, trustworthy, professional
Real brands: Intruit, QuickBooks, Xero, Wave

---

## 25. Car Dealership / Automotive

```css
:root {
  --bg: #080808;
  --bg-2: #101010;
  --bg-3: #181818;
  --primary: #E53E3E;      /* racing red */
  --secondary: #C0C0C0;    /* chrome silver */
  --accent: #E53E3E;
  --light: #F5F5F5;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.60);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(229,62,62,0.12);
  --border-hover: rgba(229,62,62,0.25);
  --grad: linear-gradient(135deg, #E53E3E, #C0392B);
}
```
Mood: Powerful, sleek, premium, dynamic
Real brands: Ferrari, Lamborghini, Audi, BMW

---

## Mesh Gradient Backgrounds
Use these for hero sections when you want visual richness:

```css
/* Purple/Blue tech mesh */
.mesh-tech {
  background:
    radial-gradient(at 20% 20%, rgba(124,58,237,0.8) 0%, transparent 50%),
    radial-gradient(at 80% 40%, rgba(6,182,212,0.6) 0%, transparent 50%),
    radial-gradient(at 50% 80%, rgba(139,92,246,0.4) 0%, transparent 50%),
    #080812;
}

/* Gold/Burgundy restaurant mesh */
.mesh-restaurant {
  background:
    radial-gradient(at 20% 30%, rgba(212,175,55,0.4) 0%, transparent 50%),
    radial-gradient(at 80% 20%, rgba(139,26,26,0.5) 0%, transparent 50%),
    radial-gradient(at 60% 80%, rgba(212,175,55,0.2) 0%, transparent 50%),
    #120A08;
}

/* Navy/Gold luxury mesh */
.mesh-luxury {
  background:
    radial-gradient(at 10% 20%, rgba(212,175,55,0.3) 0%, transparent 50%),
    radial-gradient(at 90% 50%, rgba(30,77,140,0.5) 0%, transparent 50%),
    radial-gradient(at 50% 90%, rgba(212,175,55,0.15) 0%, transparent 50%),
    #060C14;
}
```

---

## Color Psychology Quick Reference

Red/Orange: Urgency, appetite, energy — Restaurant, Fitness, Sales
Blue: Trust, calm, professional — Medical, Finance, Tech, SaaS
Green: Growth, health, nature — Wellness, Finance, Real Estate, Eco
Purple: Luxury, creativity, wisdom — Beauty, AI, Creative, Premium
Gold/Yellow: Luxury, warmth, optimism — Luxury brands, Law, Architecture
Pink: Feminine, playful, caring — Beauty, Wedding, Children, Fashion
White/Minimal: Clean, premium, trustworthy — Tech, Medical, Minimal brands
Black: Power, sophistication, premium — Fashion, Luxury, Photography
