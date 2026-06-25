# Typography That Looks Premium

“Expensive” typography often combines high-quality fonts with thoughtful scale, spacing, and hierarchy. Premium designs usually use **contrast** (e.g. pairing a serif heading with a sans-serif body) and generous spacing. In general: select a **serif or elegant display font** for headlines (it signals luxury or refinement) and a **clean sans-serif** for body text. The **type scale** (font-size progression) should be systematic (e.g. 1rem, 1.25rem, 1.5rem, 2rem, etc.) to maintain rhythm. In CSS you can implement a type scale using custom properties and CSS `clamp()` for fluid sizing. For example:

```css
:root {
  --fs-base: 1rem; 
  /* Example fluid heading */
  --fs-h1: clamp(2rem, 5vw + 1rem, 4rem);
  --ff-heading: 'Merriweather', serif;
  --ff-body: 'Lato', sans-serif;
  --lh-body: 1.6;
  --lh-heading: 1.2;
  --tracking-heading: -0.02em; 
}

h1 { font-size: var(--fs-h1); font-family: var(--ff-heading); letter-spacing: var(--tracking-heading); }
p  { font-size: var(--fs-base);   font-family: var(--ff-body);    line-height: var(--lh-body); }
```
This uses `clamp()` to let headings grow on larger screens, and sets line-height ~1.6 for body and a bit tighter (~1.2) for headings. Premium sites often add slight letter-spacing (tracking) to headings for a refined look, or even negative tracking on very large display text. (For example, many luxury brand websites and print layouts use increased whitespace between letters in logos and headings.)

**Font pairings by industry**: Some Google Font examples – import these with `<link>` or `@import`:

- *Restaurant:* ‘Playfair Display’ (serif heading) + ‘Roboto’ (sans body).  
- *Hotel/Luxury:* ‘Libre Baskerville’ + ‘Nunito Sans’.  
- *Tech SaaS:* ‘Inter’ (or ‘Space Grotesk’) + ‘Source Sans Pro’.  
- *Fitness:* ‘Montserrat’ (for headings) + ‘Open Sans’.  
- *Beauty:* ‘Lora’ + ‘Montserrat’.  
- *Medical:* ‘IBM Plex Sans’ + ‘Merriweather’.  
- *Real Estate:* ‘Playfair Display’ + ‘Lato’.  
- *Education:* ‘EB Garamond’ + ‘Roboto’.  
- *E-commerce:* ‘Poppins’ + ‘Open Sans’.  
- *Portfolio/Agency:* ‘Figtree’ + ‘Lexend Deca’.

Example import and root font CSS for one pairing:
```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@400;500;700&display=swap');
:root {
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Roboto', sans-serif;
}
h1, h2, h3 { font-family: var(--font-heading); }
body, p, li   { font-family: var(--font-body); }
```

Using **`font-size: clamp()`** (as above) ensures responsive scaling. Premium sites also carefully choose letter-spacing and line-height: e.g. a line-height ~1.5–1.6 for bodies, and tighter spacing for shorter headlines. Typography-driven sites like Linear’s blog indeed “mostly worked with opacities of black and white” (monochrome) and let hierarchy and spacing define structure, showing how typography alone can provide contrast and interest without much color.
