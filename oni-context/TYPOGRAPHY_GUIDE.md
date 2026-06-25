# Typography Hierarchy & CSS Font Scales

A comprehensive developer guide detailing professional font settings, scales, and integration rules for Oni.

---

## 1. Font Imports (Google Fonts)
Always import two high-contrast Google Fonts at the top of the `<style>` block:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
```

*   **Display Font**: *Playfair Display* (used for dramatic, large editorial titles and section headings)
*   **Body Font**: *Inter* (used for highly readable paragraph texts, details, and forms)

## 2. Global Typography Setup
Establish structural typography presets in the `body` tag:

```css
body {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  line-height: 1.75;
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}
```

## 3. Responsive Scaling (`clamp()`)
To ensure headlines adapt perfectly on mobile screen viewports without breaking into messy overlaps, use `clamp()` for font sizes:

```css
h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
}
```

## 4. Text Spacing Rules
Give text elements explicit margins and structures to build neat reading vertical grids:

```css
p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.sub-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--p);
  margin-bottom: 0.5rem;
  display: inline-block;
}
```
