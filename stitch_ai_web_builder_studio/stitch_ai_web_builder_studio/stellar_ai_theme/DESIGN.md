---
name: Oni Minimalist Noir
colors:
  surface: '#121317'
  surface-dim: '#121317'
  surface-bright: '#38393d'
  surface-container-lowest: '#0d0e12'
  surface-container-low: '#1a1b1f'
  surface-container: '#1e1f23'
  surface-container-high: '#2b2c31'
  surface-container-highest: '#36373c'
  on-surface: '#e3e2e7'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e3e2e7'
  inverse-on-surface: '#2f3035'
  outline: '#44474e'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c6c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#003731'
  tertiary-container: '#62fae3'
  on-tertiary-container: '#007165'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#62fae3'
  tertiary-fixed-dim: '#3cddc7'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005047'
  background: '#121317'
  on-background: '#e3e2e7'
  surface-variant: '#343439'
  text-primary: '#e3e2e6'
  text-secondary: '#c4c6d0'
  text-tertiary: '#8e9099'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-xs:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  sidebar-width: 260px
  container-max-width: 896px
  gutter-base: 1rem
  section-gap: 2.5rem
  input-padding: 1rem
---

## Brand & Style

Oni embodies a **Sophisticated Minimalist** aesthetic, tailored for deep focus and technical workflows. It targets developers, strategists, and writers who require a workspace that recedes into the background, allowing the content to take center stage. 

The emotional response is one of **calm authority and precision**. The interface avoids unnecessary decorative elements, relying instead on a monochromatic "Noir" palette, exceptional typography, and subtle tonal shifts to convey hierarchy. The style is heavily influenced by modern Developer Tools and luxury editorial design, utilizing high-quality whitespace and sharp, clean lines to create a premium, "zen-like" productivity environment.

## Colors

The palette is a **High-Fidelity Dark Mode** system built on a foundation of neutral grays and deep blacks. 

- **Primary & Secondary:** White (#ffffff) and Light Gray (#e2e2e2) are reserved for active states, primary text, and key brand elements to ensure maximum legibility against the dark void.
- **Surface Strategy:** Depth is defined by increasing lightness in the "Surface Container" series. The background starts at the absolute lowest black, while interactive areas like the sidebar or input fields use higher tiers of gray.
- **Accents:** A single vibrant Teal (#2dd4bf) is used sparingly as a "status" indicator (e.g., active processing or connectivity) to provide a sharp focal point without breaking the monochromatic theme.

## Typography

The typography system uses a **Dual-Family approach** to balance editorial elegance with functional utility.

- **Editorial Flourish:** `Playfair Display` is used for large greetings and primary page headers. Its high-contrast serifs provide a human, literary touch to an otherwise technical interface.
- **Systematic Utility:** `Inter` handles all functional content. It is chosen for its neutrality and high legibility at small sizes. 
- **Scale & Hierarchy:** Primary actions and headers use semi-bold weights, while secondary information (like the plan type or sidebar links) utilizes medium and regular weights with reduced opacity or "Text-Tertiary" coloring to create a clear information architecture.

## Layout & Spacing

The layout follows a **Hybrid Fixed-Fluid Model**. 

- **Sidebar:** A fixed 260px navigation pane provides structural grounding on the left, utilizing a distinct `surface-container-lowest` background to separate global navigation from the workspace.
- **Workspace:** The main content area is fluid but constrained by a `max-width: 4xl (896px)` to maintain optimal line lengths for reading and chatting.
- **Vertical Rhythm:** A generous 10vh negative margin offset is used for the central greeting to create an "airy" feel in the empty state.
- **Breakpoints:** On mobile, the sidebar collapses into a drawer, and the horizontal padding scales down from 32px to 16px to maximize screen real estate.

## Elevation & Depth

Elevation in this system is strictly **Tonal and Flat**. It rejects traditional drop shadows in favor of:

- **Border Containment:** Surfaces are defined by 1px solid borders using the `surface-container-high` or `outline` colors. This creates a "blueprint" or "schematic" feel.
- **Layered Surfaces:** The "New Chat" and "Input Area" components use `surface-container-low` to appear slightly raised against the `surface` background.
- **Focus Rings:** Interactive elements utilize a subtle 1px solid outline on focus rather than a glowing shadow, maintaining the sharp, technical aesthetic.
- **Scrollbars:** Custom minimal scrollbars use `surface-container-highest` to remain unobtrusive until needed.

## Shapes

The shape language is **Refined and Intentional**, mixing different radii to signal component importance:

- **Primary Containers:** The central chat input and quick action buttons use `2xl` (1rem) and `xl` (0.75rem) corners, making the main interaction zone feel approachable and distinct.
- **Navigation Elements:** Sidebar links and small buttons use `md` (0.375rem) corners for a tighter, more utilitarian look.
- **Tags & Indicators:** Status chips and the "Upgrade" badge use `full` (pill) rounding to distinguish them from interactive buttons.

## Components

### Buttons & Inputs
- **Primary Input:** A large, multi-line capable `textarea` housed in a `rounded-2xl` container. It should feel like a dedicated "vessel" for thought, featuring a ghost-border and high internal padding.
- **Quick Actions:** Small `rounded-xl` chips with icons and text. These should use `surface-container-high` and transition to `surface-container-highest` on hover.
- **Icon Buttons:** Square-proportioned with `rounded-md`. Icons should use `text-secondary` and shift to `primary` (white) on hover.

### Navigation
- **Sidebar Links:** High-density list items with `20px` icons. Active states are indicated by a `surface-container-high` background, while hover states use a more subtle `surface-container`.
- **User Profile:** A collapse-style button at the bottom of the navigation, featuring a circular avatar and two-line typography (Name + Plan).

### Feedback & Status
- **Teal Dot:** A small, 8px circular indicator used for connectivity or "live" states.
- **Dividers:** Minimal 1px lines using `surface-container-high` to separate structural sections (e.g., sidebar footer, top header).