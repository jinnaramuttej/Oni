export type Intent =
  | "change_text"
  | "change_color"
  | "change_layout"
  | "add_section"
  | "remove_section"
  | "new_website"
  | "full_redesign"
  | "casual";

interface ClassifierResult {
  intent: Intent;
}

const CLASSIFIER_SYSTEM_PROMPT = `You are an intent classifier for an AI website builder.

Given a user message and whether they already have a website, classify the intent into exactly one of these categories:

- change_text: User wants to change, update, or edit text content (copy, headings, paragraphs, labels)
- change_color: User wants to change colors, themes, palette, or visual style of colors
- change_layout: User wants to rearrange, reorder, resize, or restructure the layout of existing content
- add_section: User wants to add a new section or element to the existing website
- remove_section: User wants to remove, delete, or hide a section or element from the existing website
- new_website: User wants to build a brand new website from scratch
- full_redesign: User wants a complete visual overhaul of an existing website (new design, new look, rebrand)
- casual: User is chatting, greeting, asking a general question, or not requesting website changes

Rules:
- If hasExistingWebsite is false and the user asks to build/create/make/design, use "new_website"
- If hasExistingWebsite is true and the user asks for a completely new look/redesign/rebrand, use "full_redesign"
- Only output valid JSON with a single "intent" key
- Do not explain your reasoning

Output format (JSON only, no markdown, no extra text):
{"intent": "<one of the 8 intents above>"}`;

export async function classifyIntent(
  prompt: string,
  hasExistingWebsite: boolean
): Promise<Intent> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set in environment variables");
  }

  const userMessage = `User message: "${prompt}"
hasExistingWebsite: ${hasExistingWebsite}

Classify the intent.`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: CLASSIFIER_SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        max_tokens: 50,
        stream: false,
        temperature: 0,
        response_format: { type: "json_object" },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Groq classifier API error ${response.status}: ${errorText}`
    );
  }

  const data = await response.json();
  const rawContent: string = data.choices?.[0]?.message?.content ?? "";

  let parsed: ClassifierResult;
  try {
    parsed = JSON.parse(rawContent) as ClassifierResult;
  } catch {
    throw new Error(
      `Failed to parse classifier JSON response: "${rawContent}"`
    );
  }

  const validIntents: Intent[] = [
    "change_text",
    "change_color",
    "change_layout",
    "add_section",
    "remove_section",
    "new_website",
    "full_redesign",
    "casual",
  ];

  if (!validIntents.includes(parsed.intent)) {
    throw new Error(
      `Classifier returned unknown intent: "${parsed.intent}". Raw: "${rawContent}"`
    );
  }

  return parsed.intent;
}
