/**
 * test-component-selector.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * A standalone test script for the component-selector.
 *
 * Run from the project root:
 *   npx ts-node --skip-project --transpile-only scripts/test-component-selector.ts
 *
 * Or with tsx (faster, no tsconfig needed):
 *   npx tsx scripts/test-component-selector.ts
 *
 * What it does:
 *   Runs selectComponents + buildComponentContext for 4 different industries
 *   and prints the full output so you can verify it's actually reading from
 *   /oni-components/ with the correct file selections.
 * ──────────────────────────────────────────────────────────────────────────────
 */

// ── path alias shim ───────────────────────────────────────────────────────────
// ts-node/tsx won't resolve @/ aliases unless tsconfig-paths is wired up.
// We shim it here so the script is truly zero-config to run.
import { register } from "module";
import { pathToFileURL } from "url";

// For Node 18+ ESM; falls back gracefully if not supported
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { addAlias } = require("module-alias");
  addAlias("@", require("path").join(__dirname, "..", "src"));
} catch {
  // module-alias not installed — use direct relative import below instead
}

// ── Direct import (avoids alias issue entirely) ───────────────────────────────
import path from "path";
import {
  selectComponents,
  buildComponentContext,
  ComponentSelectorInput,
} from "../src/lib/component-selector";

// ── Test cases ────────────────────────────────────────────────────────────────

const TEST_CASES: ComponentSelectorInput[] = [
  {
    industry: "restaurant",
    originalPrompt: "Make a luxury Indian restaurant website called Mirchi Dhaba in Mumbai",
    brandAnswers: {
      businessName: "Mirchi Dhaba",
      location: "Mumbai",
      tone: "luxury",
      primaryColor: "#D4AF37",
      secondaryColor: "#8B1E1E",
      services: "Fine dining, private events, catering",
    },
  },
  {
    industry: "saas",
    originalPrompt: "Build a SaaS landing page for a project management tool called Nexus",
    brandAnswers: {
      businessName: "Nexus",
      tone: "modern, minimal",
      primaryColor: "#6366F1",
    },
  },
  {
    industry: "salon",
    originalPrompt: "Create a hair salon website for Maison Lumière in Paris",
    brandAnswers: {
      businessName: "Maison Lumière",
      location: "Paris",
      tone: "luxury, feminine",
      services: "Hair styling, color treatments, bridal",
    },
  },
  {
    industry: "portfolio",
    originalPrompt: "Make a dark creative portfolio for a photographer named Adrian Cole",
    brandAnswers: {
      businessName: "Adrian Cole Photography",
      tone: "dark, cinematic",
    },
  },
];

// ── Runner ────────────────────────────────────────────────────────────────────

const SEPARATOR = "═".repeat(72);
const DIVIDER   = "─".repeat(72);

function runTest(testCase: ComponentSelectorInput, index: number): void {
  console.log(`\n${SEPARATOR}`);
  console.log(`TEST ${index + 1}: ${testCase.brandAnswers?.businessName ?? testCase.industry.toUpperCase()}`);
  console.log(`Prompt: "${testCase.originalPrompt}"`);
  console.log(`Industry: ${testCase.industry}`);
  console.log(SEPARATOR);

  const result = selectComponents(testCase);

  // ── 1. Selection summary table ─────────────────────────────────────────────
  console.log("\n📋 COMPONENT SELECTION RESULTS:");
  console.log(DIVIDER);
  console.log(
    "Section".padEnd(14) +
    "File selected".padEnd(38) +
    "Score".padEnd(8) +
    "Template vars"
  );
  console.log(DIVIDER);

  for (const comp of result.components) {
    console.log(
      comp.section.padEnd(14) +
      comp.filename.padEnd(38) +
      `${comp.score}/100`.padEnd(8) +
      (comp.templateVarsFound.length > 0
        ? comp.templateVarsFound.join(", ")
        : "(none)")
    );
  }

  console.log(DIVIDER);
  console.log(
    `Total components: ${result.components.length} | ` +
    `Total context chars: ${result.totalChars} | ` +
    `Palette: ${result.palette.primary} / ${result.palette.secondary}`
  );

  // ── 2. Full componentContext string ────────────────────────────────────────
  console.log("\n📄 FULL componentContext STRING (what gets injected into system prompt):");
  console.log(DIVIDER);
  const context = buildComponentContext(result);
  console.log(context);
  console.log(DIVIDER);

  // ── 3. Quick sanity checks ─────────────────────────────────────────────────
  const checks: Array<{ label: string; pass: boolean }> = [
    {
      label: "At least 6 sections resolved",
      pass: result.components.length >= 6,
    },
    {
      label: "componentContext is non-empty",
      pass: context.length > 100,
    },
    {
      label: "Hero section present",
      pass: result.components.some((c) => c.section === "hero"),
    },
    {
      label: "Navbar section present",
      pass: result.components.some((c) => c.section === "navbar"),
    },
    {
      label: "Footer section present",
      pass: result.components.some((c) => c.section === "footer"),
    },
    {
      label: "All snippet scores > 0",
      pass: result.components.every((c) => c.score > 0),
    },
    {
      label: "Primary color propagated into context",
      pass: context.includes(result.palette.primary),
    },
  ];

  console.log("\n✅ SANITY CHECKS:");
  let allPass = true;
  for (const check of checks) {
    const icon = check.pass ? "✅" : "❌";
    console.log(`  ${icon} ${check.label}`);
    if (!check.pass) allPass = false;
  }

  if (allPass) {
    console.log("\n  🎉 All checks passed for this test case.\n");
  } else {
    console.log("\n  ⚠️  Some checks failed — investigate above.\n");
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log("🔍 Oni Component Selector — Test Runner");
console.log(`   Reading from: ${path.join(process.cwd(), "oni-components")}`);
console.log(`   Running ${TEST_CASES.length} test cases...\n`);

for (let i = 0; i < TEST_CASES.length; i++) {
  runTest(TEST_CASES[i], i);
}

console.log(`\n${SEPARATOR}`);
console.log("Done. If selections look wrong for any industry, tune the");
console.log("INDUSTRY_SIGNALS table in src/lib/component-selector.ts.");
console.log(SEPARATOR + "\n");
