/**
 * component-selector.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Reads full-page HTML template files from /oni-components/full-templates/*.html,
 * scores each template against the current build context using keyword matching,
 * and returns a `componentContext` string containing the top 1-2 matched templates.
 * 
 * Extracts the first 3500 characters of the selected templates (which includes
 * the critical <style> rules and layout grids) to guide the LLM's design.
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
  tone?: string;
  services?: string;
  contentSourcing?: string;
}

export interface ComponentSelectorInput {
  industry: string;
  originalPrompt: string;
  brandAnswers?: BrandAnswers | null;
}

export interface SelectedComponent {
  section: string;      // e.g. "full-template"
  filename: string;     // e.g. "AURELIA.html"
  score: number;        // 0–100 match confidence
  snippet: string;      // raw HTML excerpt
  templateVarsFound: string[];
}

export interface ComponentSelectorResult {
  components: SelectedComponent[];
  industry: string;
  palette: { primary: string; secondary: string };
  fonts: { display: string; body: string };
  totalChars: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_SNIPPET_CHARS = 3500;
const TEMPLATES_ROOT = path.join(process.cwd(), "oni-components", "full-templates");

const INDUSTRY_SIGNALS: Record<string, string[]> = {
  restaurant: ["restaurant", "cinematic", "dining", "food", "menu", "bakery", "croissant", "cafe", "!saas", "!light"],
  cafe: ["restaurant", "coffee", "cafe", "bakery", "bistro", "!saas"],
  salon: ["salon", "beauty", "light", "booking", "spa", "hair", "!dark", "!saas"],
  spa: ["spa", "light", "booking", "luxury", "massage", "!saas"],
  medical: ["light", "clean", "health", "clinic", "medcare", "!dark", "!restaurant"],
  fitness: ["dark", "bold", "gym", "fitness", "workout", "!light", "!restaurant"],
  saas: ["saas", "light", "tech", "software", "nexus", "!restaurant"],
  legal: ["dark", "prestige", "law", "firm", "attorney", "!light", "!restaurant"],
  education: ["light", "academy", "school", "course", "!dark", "!restaurant"],
  portfolio: ["dark", "fullscreen", "creative", "agency", "portfolio", "!light", "!restaurant"],
  general: [],
};

const PREFERS_DARK: Record<string, boolean> = {
  restaurant: true,
  cafe: true,
  salon: false,
  spa: false,
  medical: false,
  fitness: true,
  saas: false,
  legal: true,
  education: false,
  portfolio: true,
  general: true,
};

const INDUSTRY_PALETTES: Record<string, { primary: string; secondary: string }> = {
  restaurant: { primary: "#D4AF37", secondary: "#8B1E1E" },
  cafe: { primary: "#C4834A", secondary: "#14100D" },
  salon: { primary: "#E29578", secondary: "#FFDDD2" },
  spa: { primary: "#B5844A", secondary: "#D4A96A" },
  medical: { primary: "#0E86D4", secondary: "#055C9D" },
  fitness: { primary: "#39FF14", secondary: "#1F8A0D" },
  saas: { primary: "#6366F1", secondary: "#06B6D4" },
  legal: { primary: "#C5A880", secondary: "#535E71" },
  education: { primary: "#3B82F6", secondary: "#10B981" },
  portfolio: { primary: "#A855F7", secondary: "#EC4899" },
  general: { primary: "#3B82F6", secondary: "#6366F1" },
};

const INDUSTRY_FONTS: Record<string, { display: string; body: string }> = {
  restaurant: { display: "Cormorant Garamond", body: "Jost" },
  cafe: { display: "Fraunces", body: "Instrument Sans" },
  salon: { display: "Playfair Display", body: "Plus Jakarta Sans" },
  spa: { display: "Cormorant Garamond", body: "DM Sans" },
  medical: { display: "Inter", body: "Inter" },
  fitness: { display: "Oswald", body: "Montserrat" },
  saas: { display: "Plus Jakarta Sans", body: "Inter" },
  legal: { display: "Cinzel", body: "Montserrat" },
  education: { display: "Outfit", body: "Plus Jakarta Sans" },
  portfolio: { display: "Syne", body: "Space Grotesk" },
  general: { display: "Plus Jakarta Sans", body: "Plus Jakarta Sans" },
};

const STOP_WORDS = new Set([
  "make", "build", "create", "design", "generate", "want", "need",
  "website", "site", "page", "with", "that", "this", "have", "will",
  "for", "and", "the", "our", "your", "please", "just", "like",
]);

// ── Scoring helpers ───────────────────────────────────────────────────────────

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

  const isDark = combined.includes("dark") || combined.includes("bg-background") || combined.includes("background: #0");
  const isLight = combined.includes("light") || combined.includes("background: #fff");
  if (prefersDark && isDark) score += 15;
  if (!prefersDark && isLight) score += 15;

  const promptWords = prompt
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 3 && !STOP_WORDS.has(w));
  for (const word of promptWords) {
    if (combined.includes(word)) score += 10;
  }

  return Math.max(0, Math.min(100, score));
}

function extractTemplateVars(html: string): string[] {
  const matches = html.match(/\{\{[A-Z_]+\}\}/g) ?? [];
  return [...new Set(matches)];
}

// ── Public API — selectComponents ─────────────────────────────────────────────

export function selectComponents(input: ComponentSelectorInput): ComponentSelectorResult {
  const { industry, originalPrompt, brandAnswers } = input;
  const industryKey = industry in INDUSTRY_SIGNALS ? industry : "general";

  const enrichedPrompt = [
    originalPrompt,
    brandAnswers?.businessName ?? "",
    brandAnswers?.tone ?? "",
    brandAnswers?.services ?? "",
  ]
    .join(" ")
    .trim();

  if (!fs.existsSync(TEMPLATES_ROOT)) {
    return { components: [], industry: industryKey, palette: { ...INDUSTRY_PALETTES[industryKey] }, fonts: { ...INDUSTRY_FONTS[industryKey] }, totalChars: 0 };
  }

  let files: string[] = [];
  try {
    files = fs.readdirSync(TEMPLATES_ROOT).filter((f) => f.endsWith(".html"));
  } catch {
    return { components: [], industry: industryKey, palette: { ...INDUSTRY_PALETTES[industryKey] }, fonts: { ...INDUSTRY_FONTS[industryKey] }, totalChars: 0 };
  }

  const candidates: { filename: string; score: number; html: string }[] = [];

  for (const filename of files) {
    const filePath = path.join(TEMPLATES_ROOT, filename);
    let html = "";
    try {
      html = fs.readFileSync(filePath, "utf8");
    } catch {
      continue;
    }
    const score = scoreComponent(filename, html, industryKey, enrichedPrompt);
    candidates.push({ filename, score, html });
  }

  candidates.sort((a, b) => b.score - a.score);

  const selected: SelectedComponent[] = [];
  let totalChars = 0;

  // Pick top 1-2 templates
  const countToPick = Math.min(candidates.length, 2);
  for (let i = 0; i < countToPick; i++) {
    const item = candidates[i];
    const excerpt = item.html.length > MAX_SNIPPET_CHARS
      ? item.html.slice(0, MAX_SNIPPET_CHARS) + "\n  <!-- ...truncated template structure -->"
      : item.html;

    selected.push({
      section: `Reference Template ${i === 0 ? 'A' : 'B'}`,
      filename: item.filename,
      score: item.score,
      snippet: excerpt,
      templateVarsFound: extractTemplateVars(item.html),
    });
    totalChars += excerpt.length;
  }

  const palette = { ... (INDUSTRY_PALETTES[industryKey] ?? INDUSTRY_PALETTES["general"]) };
  const fonts = { ... (INDUSTRY_FONTS[industryKey] ?? INDUSTRY_FONTS["general"]) };

  if (brandAnswers?.primaryColor) palette.primary = brandAnswers.primaryColor;
  if (brandAnswers?.secondaryColor) palette.secondary = brandAnswers.secondaryColor;

  return { components: selected, industry: industryKey, palette, fonts, totalChars };
}

// ── Public API — buildComponentContext ────────────────────────────────────────

export function buildComponentContext(result: ComponentSelectorResult): string {
  if (result.components.length === 0) return "";

  const { industry, palette, fonts } = result;
  const lines: string[] = [
    "FULL TEMPLATE DESIGN REFERENCES (REFERENCE ONLY — study the layout system, typography scale, CSS classes, responsive grids, and variables. NEVER copy exact blocks or class names verbatim. Extract and synthesize visual/layout ideas):",
    `(Industry: ${industry} | Primary: ${palette.primary} | Secondary: ${palette.secondary} | Display font: ${fonts.display} | Body font: ${fonts.body})`,
    "Adapt the design styles of the references below into your generation. Write a custom premium structure matching the user's specific branding guidelines.",
    "",
  ];

  for (const comp of result.components) {
    lines.push(`=== ${comp.section.toUpperCase()} ===`);
    lines.push(`<!-- Source Template: ${comp.filename} | Match Score: ${comp.score}/100 -->`);
    lines.push(comp.snippet);
    lines.push(
      `[→ Adapt the aesthetic and structure of ${comp.filename}. ` +
        `Display font: "${fonts.display}", Body font: "${fonts.body}". ` +
        `Build a clean custom layout inspired by this look and feel, but write fresh and customized code.]`
    );
    lines.push("");
  }

  return lines.join("\n");
}
