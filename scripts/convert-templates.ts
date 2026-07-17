import fs from "fs";
import path from "path";
import { execSync, spawn } from "child_process";
import { chromium } from "playwright";

const TEMPLATES_DIR = path.join(process.cwd(), "templates");
const OUTPUT_FULL_DIR = path.join(process.cwd(), "oni-components", "full-templates");
const REPORT_PATH = path.join(process.cwd(), "templates-conversion-report.md");

// Ensure output dirs exist
if (!fs.existsSync(OUTPUT_FULL_DIR)) {
  fs.mkdirSync(OUTPUT_FULL_DIR, { recursive: true });
}

const SECTIONS = [
  "navbar",
  "hero",
  "features",
  "services",
  "testimonials",
  "cta",
  "contact",
  "footer",
];

// Helper to make section output directories
for (const section of SECTIONS) {
  const sDir = path.join(process.cwd(), "oni-components", section);
  if (!fs.existsSync(sDir)) {
    fs.mkdirSync(sDir, { recursive: true });
  }
}

// Find template folders
const items = fs.readdirSync(TEMPLATES_DIR);
const templateFolders = items.filter(item => {
  const itemPath = path.join(TEMPLATES_DIR, item);
  return fs.statSync(itemPath).isDirectory();
});

console.log(`Found ${templateFolders.length} template folders.`);

// Read existing report or start new
let reportData: Record<string, {
  status: "SUCCESS" | "FAIL" | "PENDING";
  extracted: string[];
  warnings?: string;
  error?: string;
}> = {};

if (fs.existsSync(REPORT_PATH)) {
  try {
    const rawReport = fs.readFileSync(REPORT_PATH, "utf8");
    // Parse markdown lines back to data structure
    const lines = rawReport.split("\n");
    for (const line of lines) {
      if (line.trim().startsWith("|") && !line.includes("Template Name")) {
        const parts = line.split("|").map(p => p.trim());
        if (parts.length >= 5) {
          const name = parts[1];
          if (name && name !== "---") {
            const status = parts[2].replace(/\*/g, "") as any;
            const extracted = parts[3] === "-" ? [] : parts[3].split(", ").filter(Boolean);
            const warningOrError = parts[4];
            reportData[name] = {
              status,
              extracted,
              error: status === "FAIL" ? warningOrError : undefined,
              warnings: status === "SUCCESS" ? warningOrError : undefined
            };
          }
        }
      }
    }
  } catch (e) {
    console.log("Could not parse existing report, starting fresh");
  }
}

function saveReport() {
  let md = `# Template Conversion Report\n\n`;
  md += `| Template Name | Build Status | Extracted Sections | Warnings / Errors |\n`;
  md += `| --- | --- | --- | --- |\n`;
  for (const name of templateFolders) {
    const data = reportData[name] || { status: "PENDING", extracted: [] };
    const extStr = data.extracted.length > 0 ? data.extracted.join(", ") : "-";
    const details = data.error || data.warnings || "-";
    md += `| ${name} | **${data.status}** | ${extStr} | ${details} |\n`;
  }
  fs.writeFileSync(REPORT_PATH, md, "utf8");
}

function startPreviewServer(cwd: string, port: number): Promise<{ kill: () => void }> {
  return new Promise((resolve, reject) => {
    // Run npx vite preview --port <port> --host 127.0.0.1
    const child = spawn("npx", ["vite", "preview", "--port", String(port), "--host", "127.0.0.1"], {
      cwd,
      shell: true
    });

    let stdout = "";
    child.stdout.on("data", (data) => {
      stdout += data.toString();
      if (stdout.includes("Local:") || stdout.includes("http://")) {
        resolve({
          kill: () => {
            child.kill();
          }
        });
      }
    });

    child.stderr.on("data", (data) => {
      console.error(`Preview Server Err: ${data}`);
    });

    child.on("error", (err) => {
      reject(err);
    });

    // Timeout if server doesn't report address within 5s
    setTimeout(() => {
      resolve({
        kill: () => {
          child.kill();
        }
      });
    }, 5000);
  });
}

function extractSectionsFromHtml(htmlContent: string, templateName: string): { extracted: string[], warnings: string[] } {
  const extracted: string[] = [];
  const warnings: string[] = [];
  const safeName = templateName.toLowerCase().replace(/[^a-z0-9_-]/g, "-");

  // Regex to extract elements matching section types by ID or class name
  const tagRegex = /<(section|nav|footer|div|header)\b([^>]*?)>([\s\S]*?)<\/\1>/gi;
  
  let match;
  const candidates: Array<{ section: string; elementHtml: string }> = [];

  while ((match = tagRegex.exec(htmlContent)) !== null) {
    const tagName = match[1].toLowerCase();
    const attrs = match[2];
    const fullElement = match[0];

    const attrsLower = attrs.toLowerCase();
    let matchedSection: string | null = null;
    
    if (tagName === "nav" || attrsLower.includes('nav') || attrsLower.includes('header')) {
      matchedSection = "navbar";
    } else if (attrsLower.includes('hero')) {
      matchedSection = "hero";
    } else if (attrsLower.includes('feature')) {
      matchedSection = "features";
    } else if (attrsLower.includes('service') || attrsLower.includes('pricing') || attrsLower.includes('menu')) {
      matchedSection = "services";
    } else if (attrsLower.includes('testimonial') || attrsLower.includes('review')) {
      matchedSection = "testimonials";
    } else if (attrsLower.includes('cta') || attrsLower.includes('action')) {
      matchedSection = "cta";
    } else if (attrsLower.includes('contact') || attrsLower.includes('form') || attrsLower.includes('enquiry')) {
      matchedSection = "contact";
    } else if (tagName === "footer" || attrsLower.includes('footer')) {
      matchedSection = "footer";
    }

    if (matchedSection) {
      candidates.push({
        section: matchedSection,
        elementHtml: fullElement
      });
    }
  }

  for (const targetSection of SECTIONS) {
    const sectionCandidates = candidates.filter(c => c.section === targetSection);
    if (sectionCandidates.length > 0) {
      sectionCandidates.sort((a, b) => b.elementHtml.length - a.elementHtml.length);
      const bestMatch = sectionCandidates[0].elementHtml;
      
      const byteSize = Buffer.byteLength(bestMatch, 'utf8');
      if (byteSize < 100) {
        warnings.push(`${targetSection} size is very small (${byteSize}b)`);
      }

      const targetFilePath = path.join(process.cwd(), "oni-components", targetSection, `${safeName}-${targetSection}.html`);
      fs.writeFileSync(targetFilePath, bestMatch, "utf8");
      extracted.push(targetSection);
    }
  }

  return { extracted, warnings };
}

async function processTemplate(folder: string) {
  const folderPath = path.join(TEMPLATES_DIR, folder);
  console.log(`Processing: ${folder}...`);

  let server: { kill: () => void } | null = null;
  let browser: any = null;

  try {
    // 1. Build
    console.log(`  Building bundle...`);
    execSync(`npm install lucide-react@0.475.0 && npm install && npm run build`, {
      cwd: folderPath,
      stdio: "ignore",
      timeout: 120000
    });

    // 2. Start dynamic preview server
    const port = 4900 + Math.floor(Math.random() * 100);
    server = await startPreviewServer(folderPath, port);

    // 3. Launch headless Playwright Chromium and extract rendered DOM
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}`, { waitUntil: "networkidle", timeout: 15000 });
    
    // Quick wait for animations/mounting to settle down
    await page.waitForTimeout(2000);
    
    const renderedHtml = await page.evaluate(() => document.documentElement.outerHTML);

    // Save full flat DOM
    const outputFullHtmlPath = path.join(OUTPUT_FULL_DIR, `${folder}.html`);
    fs.writeFileSync(outputFullHtmlPath, renderedHtml, "utf8");

    // 4. Extract sections
    const { extracted, warnings } = extractSectionsFromHtml(renderedHtml, folder);

    reportData[folder] = {
      status: "SUCCESS",
      extracted,
      warnings: warnings.length > 0 ? warnings.join("; ") : undefined
    };
    console.log(`  ✅ SUCCESS! Extracted: ${extracted.join(", ") || "(none)"}`);
  } catch (err: any) {
    console.error(`  ❌ FAILED: ${err.message}`);
    reportData[folder] = {
      status: "FAIL",
      extracted: [],
      error: err.message || String(err)
    };
  } finally {
    if (browser) await browser.close();
    if (server) server.kill();
    saveReport();
  }
}

// Find pending templates
async function runBatch() {
  const pending = templateFolders.filter(name => !reportData[name] || reportData[name].status === "PENDING" || reportData[name].status === "FAIL");
  
  if (pending.length === 0) {
    console.log("All templates processed successfully!");
    return;
  }

  // Batch size: 5
  const batch = pending.slice(0, 5);
  console.log(`Processing next batch of 5 templates: ${batch.join(", ")}`);
  
  for (const name of batch) {
    await processTemplate(name);
  }
}

runBatch().catch(console.error);
