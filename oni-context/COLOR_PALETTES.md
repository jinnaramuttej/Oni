# Color Theory for Web Design

Professional designers rely on **color theory** and harmonies (analogous, complementary, triadic, etc.) to create palettes that “work well together”. They often start with a **color harmony** or existing brand colors, then limit the palette to ~2–3 main hues. A common guideline is the **60/30/10 rule**: use one color (typically a neutral) for ~60% of the layout, a secondary color for ~30%, and a bright “pop” accent for ~10%. In CSS you can implement this with custom properties, for example:

```css
:root {
  --color-primary: #101828;   /* ~60% (background) */
  --color-secondary: #f2f4f7; /* ~30% (text, cards) */
  --color-accent: #22d3ee;    /* ~10% (buttons, highlights) */
}
body { background-color: var(--color-primary); color: var(--color-secondary); }
.btn { background-color: var(--color-accent); }
``` 

For **dark themes**, avoid pure black (#000) as it can look flat and “harsh.” Instead use very dark grays (#121212–#1F1F1F) or layered surfaces to add depth. Top brands illustrate this: Linear’s “Midnight” theme uses a background of **#0F0F10** (nearly black) with light grey text and a pinkish accent (#D25E65). Stripe’s palette includes **Downriver #0A2540** (dark blue) paired with white/light backgrounds and accent **#635BFF**. (Apple’s iOS dark mode similarly avoids pure black, favoring off-black/gray backgrounds and white text.) On dark backgrounds, **saturated accent colors** (e.g. electric blues, vivid pinks, neon greens) stand out well, but use them sparingly to draw focus.

**Industry palettes:** Certain industries gravitate to characteristic palettes (often guided by color psychology). For example:
- **Restaurant:** Warm appetizing tones – deep red/orange (#E74C3C), mustard yellow (#F1C40F), and a neutral grey.  
- **Hotel/Luxury:** Rich neutrals – navy or charcoal (#2C3E50), gold (#C39BD3 or #D4AF37), ivory or pale cream (#F1EDE6).  
- **Tech SaaS:** Modern high-contrast – dark backgrounds (#1E1E3E) with bright neon (#00CFFF) or purple accents (#A25524).  
- **Fitness/Health:** Energetic brights – emerald green (#27AE60), slate blue (#2980B9), and white/grey accents.  
- **Beauty/Fashion:** Elegant pastels – blush pink (#E8C9CF), lavender (#E6E6FA), soft taupe (#AC9C8D).  
- **Medical:** Calming teals – light aqua (#E0F7FA), rich teal (#00796B), with clean white.  
- **Real Estate:** Trustworthy blues and greys – sky blue (#2196F3), charcoal (#212121), warm neutral (#BDC3C7).  
- **Education:** Scholarly blue and gold – deep blue (#34495E), gold (#F1C40F), off-white (#ECF0F1).  
- **E-commerce/Retail:** Versatile mix – bright accent (#F59E0B), mid grey (#374151), white.  
- **Portfolio/Agency:** Minimal black & white plus one accent – black (#1C1C1E), white (#F2F2F7), and one vivid accent (e.g. magenta #FF0080).

For **gradient palettes**, use multiple stops and subtle transitions to look premium. E.g.:  
```css
.hero {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 50%, #ff9a9e 100%);
}
``` 
Complex **mesh gradients** (trendy in 2025) can be faked by layering multiple radial gradients with transparent stops:  
```css
.mesh {
  background: 
    radial-gradient(at 20% 20%, rgba(200,88,218,0.8) 0%, transparent 50%),
    radial-gradient(at 80% 40%, rgba(116,240,251,0.8) 0%, transparent 50%),
    radial-gradient(at 50% 80%, rgba(223,229,113,0.8) 0%, transparent 50%),
    #090909;
}
``` 
This uses several colored spots overlaid to mimic a “mesh” of color.

**Color psychology:** While interpretations vary culturally, certain colors often yield similar reactions. For instance, blue conveys trust and calm (popular in tech/finance), red evokes urgency and appetite (effective for restaurants and calls-to-action), and green implies health and growth (good for medical or eco-brands). High-contrast accents drive focus: for example, using a bright accent (red or yellow) on your primary CTA can significantly increase conversions. (One study notes that color increases brand recognition by ~80%.) In practice, always A/B test any color-driven CTAs, since context matters.

Finally, **20 production-ready palettes:** Here are example 3-color palettes (hex) for each industry above:

- **Restaurant:** `#E74C3C` (tomato red), `#F1C40F` (mustard), `#F2F4F7` (off-white).  
- **Hotel (Luxury):** `#2C3E50` (navy), `#D4AF37` (gold), `#F2EDEB` (cream).  
- **Tech SaaS:** `#1E1E3E` (midnight), `#00CFFF` (cyan), `#AA00FF` (electric purple).  
- **Fitness:** `#27AE60` (green), `#2980B9` (blue), `#F39C12` (orange).  
- **Beauty:** `#E8C9CF` (dusty pink), `#AC9C8D` (taupe), `#72383D` (deep rose).  
- **Medical:** `#E0F7FA` (pale teal), `#00796B` (teal), `#004D40` (dark teal).  
- **Real Estate:** `#2C3E50` (charcoal), `#D35400` (burnt orange), `#BDC3C7` (gray).  
- **Education:** `#34495E` (indigo), `#F39C12` (gold), `#ECF0F1` (off-white).  
- **E-commerce:** `#34495E` (slate), `#E67E22` (orange), `#F2F4F7` (light gray).  
- **Portfolio/Agency:** `#1C1C1E` (black), `#F2F2F7` (white), `#FF0080` (magenta accent).

These palettes (example hex values) should be tweaked to match each brand’s identity, but they illustrate how to combine neutrals with a strong accent per industry.
