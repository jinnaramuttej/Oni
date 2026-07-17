/**
 * html-validator.ts
 * 
 * Lightweight structural validator for generated HTML to ensure compatibility 
 * with the Oni live preview environment. Checks for common model failure states:
 * - Local/relative external files (href or src not starting with http/https/data:)
 * - Malformed HTML tags (like <h1.class> or <div#id>)
 * - Duplicate ID attributes
 * - Placeholder or local image source URLs
 * - Undefined CSS classes used in elements
 * - Font Awesome icons used without a CDN loaded
 * - source.unsplash.com usage (deprecated service)
 */

export interface ValidationResult {
  valid: boolean;
  issues: string[];
}

export function validateGeneratedHtml(html: string): ValidationResult {
  const issues: string[] = [];

  if (!html || html.trim().length === 0) {
    return { valid: false, issues: ["Empty HTML content"] };
  }

  // 1. External file references (css/js/images/etc.)
  // Look for <link href="..."> or <script src="..."> where path does not start with http/https or data:
  const linkMatches = html.matchAll(/<link\s+[^>]*href=["']((?!http|https|data:|#)[^"']+)["'][^>]*>/gi);
  for (const match of linkMatches) {
    issues.push(`External local stylesheet or link reference found: "${match[1]}"`);
  }

  const scriptMatches = html.matchAll(/<script\s+[^>]*src=["']((?!http|https|data:)[^"']+)["'][^>]*>/gi);
  for (const match of scriptMatches) {
    issues.push(`External local script reference found: "${match[1]}"`);
  }

  // 2. Relative/placeholder image paths & source.unsplash.com check
  // Look for <img src="..."> where src does not start with http/https or data:
  const imgMatches = html.matchAll(/<img\s+[^>]*src=["']([^"']+)["']/gi);
  for (const match of imgMatches) {
    const src = match[1];
    if (src.includes("source.unsplash.com")) {
      issues.push(`Broken image source service "source.unsplash.com" used in img src. This service is dead. Please use images.unsplash.com with a specific photo ID instead.`);
    } else if (!src.startsWith("http://") && !src.startsWith("https://") && !src.startsWith("data:") && !src.startsWith("/api/placeholder")) {
      issues.push(`Relative or local image src found: "${src}". All images must use full https:// URLs.`);
    }
  }

  // Check CSS file/inline urls for source.unsplash.com
  if (html.includes("source.unsplash.com")) {
    const hasUnsplashCSS = /url\(['"]?[^'"]*source\.unsplash\.com[^'"]*['"]?\)/i.test(html);
    if (hasUnsplashCSS) {
      issues.push(`Broken image source service "source.unsplash.com" used in CSS url(). This service is dead. Please use images.unsplash.com with a specific photo ID instead.`);
    }
  }

  // 3. Malformed tags (e.g. <div.class> or <h1#id>)
  // Look for opening tags containing dots or hashes in the tag name itself before whitespace/closing
  const malformedTagMatches = html.match(/<[a-zA-Z0-9]+[\.#][a-zA-Z0-9\-_\.#]+/g);
  if (malformedTagMatches) {
    malformedTagMatches.forEach(tag => {
      issues.push(`Malformed HTML tag containing CSS selector: "${tag}"`);
    });
  }

  // 4. Duplicate ID attributes
  // Extract all id="..." or id='...' values and check for duplicates
  const idMatches = html.matchAll(/\bid=["']([^"']+)["']/gi);
  const seenIds = new Set<string>();
  const duplicateIds = new Set<string>();
  for (const match of idMatches) {
    const idValue = match[1];
    if (seenIds.has(idValue)) {
      duplicateIds.add(idValue);
    } else {
      seenIds.add(idValue);
    }
  }
  if (duplicateIds.size > 0) {
    issues.push(`Duplicate ID attributes found: ${Array.from(duplicateIds).map(id => `"${id}"`).join(", ")}`);
  }

  // 5. CSS Class Validation
  // Extract all class definitions from inside <style> blocks
  const definedClasses = new Set<string>();
  const styleBlockMatches = html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  for (const match of styleBlockMatches) {
    const css = match[1];
    // Match CSS class selectors: e.g. .classname or .class-name or .class1.class2
    // Simple parser matching class names starting with dots
    const classSelectorRegex = /\.([a-z0-9-_]+)/gi;
    let cssMatch;
    while ((cssMatch = classSelectorRegex.exec(css)) !== null) {
      definedClasses.add(cssMatch[1]);
    }
  }

  // Extract all classes used in the HTML markup
  const usedClasses = new Set<string>();
  const classAttrMatches = html.matchAll(/\bclass=["']([^"']+)["']/gi);
  for (const match of classAttrMatches) {
    const classList = match[1].split(/\s+/);
    for (const c of classList) {
      const trimmed = c.trim();
      if (trimmed) {
        usedClasses.add(trimmed);
      }
    }
  }

  // Define a safe allowlist for classes that are toggled by standard JS scripts
  const jsSafeAllowlist = new Set([
    "active", "open", "scrolled", "hidden", "visible", "show", "current",
    "selected", "disabled", "loading", "fade-in", "fade-out", "slide-in"
  ]);

  const undefinedUsedClasses: string[] = [];
  for (const usedClass of usedClasses) {
    // If class is not defined in CSS, isn't in JS allowlist, flag it
    if (!definedClasses.has(usedClass) && !jsSafeAllowlist.has(usedClass)) {
      undefinedUsedClasses.push(usedClass);
    }
  }

  if (undefinedUsedClasses.length > 0) {
    issues.push(`CSS classes used in HTML but never defined in <style>: ${undefinedUsedClasses.join(", ")}`);
  }

  // 6. Font Awesome validation without CDN check
  // Check if fa icon elements exist
  const hasFaIcons = /<i\s+[^>]*class=["'][^"']*\bfa[srlb]?\b/i.test(html);
  if (hasFaIcons) {
    // Check if Font Awesome CDN link is present in head
    const hasFaCDN = /<link\s+[^>]*href=["'][^"']*font-awesome[^"']*["']/i.test(html) || 
                     /<link\s+[^>]*href=["'][^"']*all\.min\.css[^"']*["']/i.test(html) ||
                     /cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome/i.test(html);
    if (!hasFaCDN) {
      issues.push("Font Awesome icon classes (fa, fas, far, fab) are used but no Font Awesome CDN link was loaded in the <head>. Include the Font Awesome CDN link or use inline SVGs / emojis instead.");
    }
  }

  return {
    valid: issues.length === 0,
    issues
  };
}
