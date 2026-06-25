# Reference Sites and Photography Alternatives

This document defines premium design inspirations and photography alternatives utilizing stock APIs and pure CSS methods to maintain high visual aesthetics without relying on hardcoded image files.

---

## 1. Premium Reference Sites

### Linear.app (Tech/SaaS Inspiration)
*   **Aesthetic**: Dark, clean, grid-based luxury minimalism.
*   **Key Patterns to Replicate**:
    *   **Borders**: Deep gray cards with ultra-thin semi-transparent light borders (`border: 1px solid rgba(255, 255, 255, 0.08)`).
    *   **Grid layout**: Asymmetric grid layouts where one featured card spans 2 columns, and two minor cards stack vertically or side-by-side.
    *   **Gradients**: Extremely fine top borders that reflect a colored gradient.

### Aman Hotels & Resorts (Luxury Hospitality)
*   **Aesthetic**: Spacious, warm cream-colored minimalist elegance.
*   **Key Patterns to Replicate**:
    *   **Margins**: Huge, luxurious text line heights (`1.8`), uppercase headers with wide spacing (`letter-spacing: 0.15em`).
    *   **Grid**: Large editorial grid layouts with thin, minimal separation lines and spacious masonry card structures.
    *   **Typography**: Playfair Display or Garamond-based headings with Inter or Jost body copy.

### Stripe.com (Landing Page Flow & Badges)
*   **Aesthetic**: Dynamic layouts, rich neon colors, glowing visual indicators.
*   **Key Patterns to Replicate**:
    *   **Stats section**: Inline columns with bold stats numbers and thin dividers.
    *   **Badge elements**: Small capsule pills (e.g. "Release 2.0" or "Coming Soon") positioned above hero headlines with subtle background highlights.
    *   **Shadows**: Deep box shadows that blend smooth blur parameters (`0 20px 50px rgba(0, 0, 0, 0.25)`).

### Eleven Madison Park (Premium Restaurant)
*   **Aesthetic**: Dark luxury, gold-on-black, clean menu presentation.
*   **Key Patterns to Replicate**:
    *   **Menus**: Simple grid listings with item names, brief 1-line ingredient lists, and prices aligned to the right.
    *   **CTAs**: Single-action reserve buttons that open up neat booking calendars or slide-out forms.
    *   **Imagery**: Single full-width header background images displaying ambient candlelight scenes or close-up culinary photos.

---

## 2. Images and Photography Alternatives

Since the AI cannot fetch arbitrary local images, use Unsplash Source URLs in this exact format:

*   **Images**: `<img src="https://images.unsplash.com/photo-[ID]?w=800&q=80&fit=crop" alt="description">`
*   **Backgrounds**: `background-image: url('https://images.unsplash.com/photo-[ID]?w=1920&q=80&fit=crop');`

### Specific Unsplash Photo IDs by Business Type:
- **Restaurant food**: `1565299624`
- **Restaurant interior**: `1414235077`
- **Hotel lobby**: `1542314831`
- **Hotel room**: `1631049307`
- **Fitness gym**: `1534438327`
- **Beauty salon**: `1560066263`
- **Real estate**: `1560518883`
- **Medical clinic**: `1519494026`
- **Tech office**: `1497366216`
- **Coffee shop**: `1495474472`
- **Hero dark abstract**: `1557804506`
- **Team people**: `1522071820`

---

## 3. Stock Photo APIs and CSS Image Placeholders

*   **Free Stock APIs**: Use parameterizable image links from Lorem Picsum (`https://picsum.photos/1200/800`) or Picsum Grayscale (`https://picsum.photos/1200/800?grayscale`).
*   **CSS Gradients & Overlays**: Overlay a dark linear gradient over background images to increase text contrast:
    ```css
    .hero {
      background-image: 
        linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0)),
        url('https://images.unsplash.com/photo-1557804506?w=1920&q=80&fit=crop');
      background-size: cover;
    }
    ```
*   **Pure CSS Hero Backgrounds**:
    1.  **Color Waves**:
        ```css
        .hero-1 {
          background: linear-gradient(45deg, #ff758c, #ff7eb3);
        }
        ```
    2.  **Mesh Gradient**: Layer multiple radial gradients with transparent stops:
        ```css
        .mesh {
          background: 
            radial-gradient(at 20% 20%, rgba(200,88,218,0.8) 0%, transparent 50%),
            radial-gradient(at 80% 40%, rgba(116,240,251,0.8) 0%, transparent 50%),
            radial-gradient(at 50% 80%, rgba(223,229,113,0.8) 0%, transparent 50%),
            #090909;
        }
        ```
    3.  **Abstract Stripes**:
        ```css
        .hero-stripe {
          background: repeating-linear-gradient(45deg, #667eea, #667eea 10px, #764ba2 10px, #764ba2 20px);
        }
        ```
