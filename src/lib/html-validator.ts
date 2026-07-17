/**
 * html-validator.ts
 * 
 * Lightweight structural validator for generated HTML to ensure compatibility 
 * with the Oni live preview environment. Checks for common model failure states:
 * - Local/relative external files (href or src not starting with http/https/data:)
 * - Malformed HTML tags (like <h1.class> or <div#id>)
 * - Duplicate ID attributes
 * - Placeholder or local image source URLs
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

  // 2. Relative/placeholder image paths
  // Look for <img src="..."> where src does not start with http/https or data:
  const imgMatches = html.matchAll(/<img\s+[^>]*src=["']((?!http|https|data:|\/api\/placeholder)[^"']+)["'][^>]*>/gi);
  for (const match of imgMatches) {
    issues.push(`Relative or local image src found: "${match[1]}". All images must use full https:// URLs.`);
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

  return {
    valid: issues.length === 0,
    issues
  };
}
