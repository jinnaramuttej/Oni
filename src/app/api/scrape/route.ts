import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json().catch(() => ({}));

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid URL' }, { status: 400 });
    }

    // Add protocols if missing
    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      next: { revalidate: 3600 } // cache for 1 hour
    });

    if (!response.ok) {
      return NextResponse.json({
        title: '',
        description: '',
        content: '',
        error: `HTTP Error: ${response.status} ${response.statusText}`
      });
    }

    const html = await response.text();

    // Extract Title
    let title = '';
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim();
    }

    // Extract Meta Description
    let description = '';
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i) ||
                      html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["']/i);
    if (descMatch && descMatch[1]) {
      description = descMatch[1].trim();
    }

    // Process Text Content
    let cleanText = html;

    // 1. Strip script tags
    cleanText = cleanText.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ');
    // 2. Strip style tags
    cleanText = cleanText.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ');
    // 3. Strip other head/header elements if needed, but basic HTML strip handles the rest
    // 4. Strip all HTML tags
    cleanText = cleanText.replace(/<[^>]+>/g, ' ');
    // 5. Decode basic HTML entities
    cleanText = cleanText
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'");

    // 6. Clean up white spaces
    cleanText = cleanText.replace(/\s+/g, ' ').trim();

    // Limit to 2000 characters
    const content = cleanText.slice(0, 2000);

    return NextResponse.json({
      title,
      description,
      content,
    });
  } catch (err: any) {
    console.error('Failed to scrape URL:', err);
    return NextResponse.json({
      title: '',
      description: '',
      content: '',
      error: err.message || 'Failed to fetch the URL'
    });
  }
}
