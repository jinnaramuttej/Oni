/**
 * component-selector.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Reads HTML snippet files from /oni-components/{section}/*.html at request
 * time, scores each file against the current build context using lightweight
 * keyword matching, and returns a `componentContext` string ready to be
 * injected into the AI system prompt.
 *
 * DESIGN DECISION — runtime reads vs. build-time index:
 *
 *   Runtime reads (current approach):
 *     + Zero build step — add a new .html file and it's picked up immediately.
 *     + No stale-cache risk.
 *     - Tiny fs.readdirSync + fs.readFileSync overhead on every request.
 *       In practice this is negligible (<2 ms for ~20 files of 1-5 KB each).
 *
 *   Build-time index (future option when the library grows large):
 *     + Zero I/O per request — everything is a JS object baked at build time.
 *     - Must re-build after every snippet change.
 *     - More infrastructure (a codegen script or a Next.js generateStaticParams step).
 *
 *   For the current library size (~20 files, <80 KB total) runtime reads are
 *   the right call. If the library ever grows beyond ~200 files, switch to a
 *   build-time index.
 *
 * EXPORTED API:
 *   selectComponents(input: ComponentSelectorInput): ComponentSelectorResult
 *   buildComponentContext(result: ComponentSelectorResult): string
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs from "fs";
import path from "path";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface BrandAnswers {
  businessName?: string;
  industry?: string;
  location?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tone?: string;         // e.g. "luxury", "friendly", "minimal", "bold"
  services?: string;
}

export interface ComponentSelectorInput {
  /** Detected industry key (restaurant, salon, saas, medical, fitness, legal, education, portfolio, general) */
  industry: string;
  /** Raw prompt from the user */
  originalPrompt: string;
  /** Brand answers collected from the enhance modal */
  brandAnswers?: BrandAnswers | null;
}

export interface SelectedComponent {
  section: string;      // e.g. "hero"
  filename: string;     // e.g. "restaurant-cinematic.html"
  score: number;        // 0–100 match confidence
  snippet: string;      // raw HTML, potentially truncated to MAX_SNIPPET_CHARS
  templateVarsFound: string[]; // which {{VARS}} are present in this snippet
}

export interface ComponentSelectorResult {
  components: SelectedComponent[];
  industry: string;
  palette: { primary: string; secondary: string };
  fonts: { display: string; body: string };
  totalChars: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

/** Max characters to include per section snippet in the final context string */
const MAX_SNIPPET_CHARS = 600;

/** Root directory of the component library */
const COMPONENTS_ROOT = path.join(process.cwd(), "oni-components");

/**
 * All sections we attempt to resolve.
 * Order matters — it becomes the order sections appear in componentContext.
 */
const SECTIONS = [
  "navbar",
  "hero",
  "features",
  "services",
  "testimonials",
  "cta",
  "contact",
  "footer",
] as const;

type Section = (typeof SECTIONS)[number];

// ── Industry → scoring signals ────────────────────────────────────────────────
/**
 * For each industry, a list of keywords that should BOOST a file's score when
 * found in its filename or HTML content. Negative keywords (prefixed with "!")
 * subtract from the score.
 */
const INDUSTRY_SIGNALS: Record<string, string[]> = {
  restaurant: ["restaurant", "cinematic", "dining", "food", "menu", "reservation", "!saas", "!light"],
  cafe: ["restaurant", "cinematic", "coffee", "cafe", "!saas"],
  salon:  ["salon", "beauty", "light", "booking", "!dark", "!saas"],
  spa:    ["spa", "light", "booking", "luxury", "!saas"],
  medical:["light", "clean", "numbered", "!dark", "!restaurant"],
  fitness:["dark", "bold", "!light", "!restaurant"],
  saas:   ["saas", "light", "numbered", "tech", "!restaurant", "!cinematic"],
  legal:  ["dark", "list", "clean", "!light", "!restaurant"],
  education: ["light", "numbered", "!dark", "!restaurant"],
  portfolio: ["dark", "fullscreen", "!light", "!restaurant"],
  general:   [],
};

/** Dark vs light preference per industry (used to break ties) */
const PREFERS_DARK: Record<string, boolean> = {
  restaurant: true,
  cafe:       true,
  salon:      false,
  spa:        false,
  medical:    false,
  fitness:    true,
  saas:       false,
  legal:      true,
  education:  false,
  portfolio:  true,
  general:    true,
};

/** Industry → palette colors */
const INDUSTRY_PALETTES: Record<string, { primary: string; secondary: string }> = {
  restaurant: { primary: "#D4AF37", secondary: "#8B1E1E" },
  cafe:       { primary: "#C4834A", secondary: "#14100D" },
  salon:      { primary: "#E29578", secondary: "#FFDDD2" },
  spa:        { primary: "#B5844A", secondary: "#D4A96A" },
  medical:    { primary: "#0E86D4", secondary: "#055C9D" },
  fitness:    { primary: "#39FF14", secondary: "#1F8A0D" },
  saas:       { primary: "#6366F1", secondary: "#06B6D4" },
  legal:      { primary: "#C5A880", secondary: "#535E71" },
  education:  { primary: "#3B82F6", secondary: "#10B981" },
  portfolio:  { primary: "#A855F7", secondary: "#EC4899" },
  general:    { primary: "#3B82F6", secondary: "#6366F1" },
};

/** Industry → font pairing */
const INDUSTRY_FONTS: Record<string, { display: string; body: string }> = {
  restaurant: { display: "Cormorant Garamond", body: "Jost" },
  cafe:       { display: "Fraunces", body: "Instrument Sans" },
  salon:      { display: "Playfair Display", body: "Plus Jakarta Sans" },
  spa:        { display: "Cormorant Garamond", body: "DM Sans" },
  medical:    { display: "Inter", body: "Inter" },
  fitness:    { display: "Oswald", body: "Montserrat" },
  saas:       { display: "Plus Jakarta Sans", body: "Inter" },
  legal:      { display: "Cinzel", body: "Montserrat" },
  education:  { display: "Outfit", body: "Plus Jakarta Sans" },
  portfolio:  { display: "Syne", body: "Space Grotesk" },
  general:    { display: "Plus Jakarta Sans", body: "Plus Jakarta Sans" },
};

// ── Scoring helpers ───────────────────────────────────────────────────────────

/**
 * Compute a 0–100 score for a single component file.
 *
 * Scoring breakdown:
 *   - Each positive keyword found in filename OR html content: +20 pts
 *   - Each negative keyword (prefixed "!") found:             -25 pts
 *   - Prompt keyword match in filename or html:               +10 pts per hit
 *   - Dark/light preference alignment:                        +15 pts
 * Score is clamped to [0, 100].
 */
function scoreComponent(
  filename: string,
  htmlContent: string,
  industry: string,
  prompt: string
): number {
  const normalizedIndustry = industry in INDUSTRY_SIGNALS ? industry : "general";
  const signals = INDUSTRY_SIGNALS[normalizedIndustry] ?? [];
  const prefersDark = PREFERS_DARK[normalizedIndustry] ?? true;

  const combined = (filename + " " + htmlContent).toLowerCase();
  let score = 0;

  for (const signal of signals) {
    if (signal.startsWith("!")) {
      const negKw = signal.slice(1);
      if (combined.includes(negKw)) score -= 25;
    } else {
      if (combined.includes(signal)) score += 20;
    }
  }

  // Dark/light preference
  const isDark = combined.includes("dark");
  const isLight = combined.includes("light");
  if (prefersDark && isDark) score += 15;
  if (!prefersDark && isLight) score += 15;

  // Prompt keyword bonus (strip common stop words first)
  const promptWords = prompt
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 3 && !STOP_WORDS.has(w));
  for (const word of promptWords) {
    if (combined.includes(word)) score += 10;
  }

  return Math.max(0, Math.min(100, score));
}

const STOP_WORDS = new Set([
  "make", "build", "create", "design", "generate", "want", "need",
  "website", "site", "page", "with", "that", "this", "have", "will",
  "for", "and", "the", "our", "your", "please", "just", "like",
]);

// ── Template variable extraction ──────────────────────────────────────────────

/** Find all {{VARIABLE_NAME}} placeholders present in the HTML snippet */
function extractTemplateVars(html: string): string[] {
  const matches = html.match(/\{\{[A-Z_]+\}\}/g) ?? [];
  return [...new Set(matches)];
}

// ── Core: read + score all files for one section ──────────────────────────────

function resolveSection(
  section: Section,
  industry: string,
  prompt: string
): SelectedComponent | null {
  const sectionDir = path.join(COMPONENTS_ROOT, section);

  if (!fs.existsSync(sectionDir)) {
    return null;
  }

  let files: string[];
  try {
    files = fs.readdirSync(sectionDir).filter((f) => f.endsWith(".html"));
  } catch {
    return null;
  }

  if (files.length === 0) return null;

  let best: { filename: string; score: number; html: string } | null = null;

  for (const filename of files) {
    const filePath = path.join(sectionDir, filename);
    let html = "";
    try {
      html = fs.readFileSync(filePath, "utf8");
    } catch {
      continue;
    }

    const score = scoreComponent(filename, html, industry, prompt);

    if (!best || score > best.score) {
      best = { filename, score, html };
    }
  }

  if (!best) return null;

  const snippet =
    best.html.length > MAX_SNIPPET_CHARS
      ? best.html.slice(0, MAX_SNIPPET_CHARS) + "\n  <!-- ...truncated -->"
      : best.html;

  return {
    section,
    filename: best.filename,
    score: best.score,
    snippet,
    templateVarsFound: extractTemplateVars(best.html),
  };
}

// ── Public API — selectComponents ─────────────────────────────────────────────

/**
 * Selects the best-matching HTML component for each section.
 * Safe to call at request time — I/O is fast for this library size.
 */
export function selectComponents(input: ComponentSelectorInput): ComponentSelectorResult {
  const { industry, originalPrompt, brandAnswers } = input;

  // Normalise industry key
  const industryKey = industry in INDUSTRY_SIGNALS ? industry : "general";

  // Enrich the prompt with brand signals for scoring
  const enrichedPrompt = [
    originalPrompt,
    brandAnswers?.businessName ?? "",
    brandAnswers?.tone ?? "",
    brandAnswers?.services ?? "",
  ]
    .join(" ")
    .trim();

  const components: SelectedComponent[] = [];
  let totalChars = 0;

  for (const section of SECTIONS) {
    const resolved = resolveSection(section, industryKey, enrichedPrompt);
    if (resolved) {
      components.push(resolved);
      totalChars += resolved.snippet.length;
    }
  }

  const palette =
    INDUSTRY_PALETTES[industryKey] ?? INDUSTRY_PALETTES["general"];
  const fonts =
    INDUSTRY_FONTS[industryKey] ?? INDUSTRY_FONTS["general"];

  // If brandAnswers contains colour overrides, use them
  if (brandAnswers?.primaryColor) palette.primary = brandAnswers.primaryColor;
  if (brandAnswers?.secondaryColor) palette.secondary = brandAnswers.secondaryColor;

  return { components, industry: industryKey, palette, fonts, totalChars };
}

// ── Public API — buildComponentContext ────────────────────────────────────────

/**
 * Converts a ComponentSelectorResult into a plain-text string that can be
 * appended to the AI system prompt.
 *
 * Format:
 *   COMPONENT DESIGN REFERENCES:
 *   === HERO ===
 *   <!-- source: restaurant-cinematic.html | score: 75 -->
 *   <section ...> … </section>
 *   [Adapt this HERO for {industry}. Use primary: #D4AF37, secondary: #8B1E1E.
 *    Display font: Cormorant Garamond. Body font: Jost.
 *    Replace {{BUSINESS_NAME}}, {{PRIMARY_COLOR}} etc. with real values.]
 *   ...
 */
export function buildComponentContext(result: ComponentSelectorResult): string {
  if (result.components.length === 0) return "";

  const { industry, palette, fonts } = result;
  const lines: string[] = [
    "COMPONENT DESIGN REFERENCES:",
    `(Industry: ${industry} | Primary: ${palette.primary} | Secondary: ${palette.secondary} | Display font: ${fonts.display} | Body font: ${fonts.body})`,
    "Study each section snippet below. Borrow the grid structures, hover effects, and class patterns. Do NOT copy them verbatim — adapt and elevate them for the user's specific brand.",
    "",
  ];

  for (const comp of result.components) {
    const sectionLabel = comp.section.toUpperCase();
    lines.push(`=== ${sectionLabel} ===`);
    lines.push(`<!-- source: ${comp.filename} | match score: ${comp.score}/100 -->`);
    lines.push(comp.snippet);
    lines.push(
      `[→ Adapt this ${sectionLabel} for a ${industry} business. ` +
        `Primary color: ${palette.primary}, Secondary: ${palette.secondary}. ` +
        `Display font: "${fonts.display}", Body font: "${fonts.body}". ` +
        (comp.templateVarsFound.length > 0
          ? `Replace template vars: ${comp.templateVarsFound.join(", ")} with real business values. `
          : "") +
        `Make it significantly more premium and animated than this reference snippet.]`
    );
    lines.push("");
  }

  return lines.join("\n");
}
