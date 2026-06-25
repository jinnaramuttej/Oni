import { NextResponse } from "next/server";
import { sanitizeText } from "@/lib/auth";
import DOMPurify from "isomorphic-dompurify";

const ENHANCE_SYSTEM_PROMPT = `You are an expert prompt engineer. Your task is to rewrite a simple website design request (e.g. "make a bakery website") into a detailed, high-fidelity website design prompt for an AI page builder.

CRITICAL RULES:
1. Output ONLY the rewritten prompt. Do NOT wrap it in quotes, markdown, or code blocks.
2. DO NOT write any introductions, explanations, greetings, or chat text (e.g. do not write "Here is your enhanced prompt:").
3. Limit the response to exactly 1-2 highly descriptive sentences.
4. Include concrete premium details: specific layout structures (e.g., asymmetric grids, full-screen hero orbs), modern color palettes (e.g., dark obsidian with gold accents, soft warm clays), premium typography (e.g., Cormorant Garamond headings and Jost body), interactive details (e.g., reservation modals, testimonials), and smooth entrance animations.

Example Input: "make a luxury hotel website"
Example Output: "Build a premium responsive website for a luxury clifftop hotel with a dark slate background, gold accents, Cormorant Garamond display typography, a modular room grid layout, and an interactive booking calendar modal."`;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.prompt !== "string") {
    return new NextResponse("Bad request", { status: 400 });
  }

  const cleanPrompt = sanitizeText(
    DOMPurify.sanitize(body.prompt, { ALLOWED_TAGS: [] })
  ).trim();

  if (!cleanPrompt || cleanPrompt.length < 3) {
    return new NextResponse("Prompt is too short", { status: 400 });
  }

  const defaultModelInput = body?.defaultModel || "oni-pro";
  const isExplicitOllama = defaultModelInput === "local-ollama";

  const messagesToSend = [
    { role: "system", content: ENHANCE_SYSTEM_PROMPT },
    { role: "user", content: `Rewrite this prompt to make it a premium design request: "${cleanPrompt}"` }
  ];

  if (isExplicitOllama) {
    try {
      console.log("Enhancing prompt using local Ollama...");
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const ollamaRequestBody = JSON.stringify({
        model: "qwen2.5-coder:latest",
        messages: messagesToSend,
        temperature: 0.7,
        max_tokens: 150,
        stream: false,
        options: {
          num_ctx: 4096,
        },
      });

      const ollamaResponse = await fetch("http://127.0.0.1:11434/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: ollamaRequestBody,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!ollamaResponse.ok) {
        const errorText = await ollamaResponse.text().catch(() => "");
        throw new Error(`Ollama status ${ollamaResponse.status}: ${errorText}`);
      }

      const data = await ollamaResponse.json();
      const content = data?.choices?.[0]?.message?.content?.trim();
      if (content) {
        return NextResponse.json({ enhancedPrompt: content });
      }
    } catch (err) {
      console.warn("Local Ollama enhancement failed, falling back to Groq:", err);
    }
  }

  // Fallback / standard cloud enhancement using fast llama-3.1-8b-instant
  const groqApiKey = process.env.GROQ_API_KEY?.trim();
  if (!groqApiKey) {
    return new NextResponse("GROQ_API_KEY is missing", { status: 500 });
  }

  try {
    const groqRequestBody = JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: messagesToSend,
      temperature: 0.7,
      max_tokens: 150,
      stream: false,
    });

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: groqRequestBody,
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text().catch(() => "");
      throw new Error(`Groq status ${groqResponse.status}: ${errorText}`);
    }

    const data = await groqResponse.json();
    const content = data?.choices?.[0]?.message?.content?.trim();
    if (content) {
      // Strip outer quotes if the model wrapped the response in quotes
      const cleanedContent = content.replace(/^["']|["']$/g, "").trim();
      return NextResponse.json({ enhancedPrompt: cleanedContent });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Enhance prompt request failed:", err);
    return new NextResponse(`Prompt enhancement failed: ${message}`, { status: 500 });
  }

  return new NextResponse("Failed to enhance prompt", { status: 500 });
}
