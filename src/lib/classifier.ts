export type Intent = "build_request" | "casual_chat" | "edit_request";

export interface ExtractedInfo {
  name: string;
  location: string;
  colors: string[];
}

export interface StructuredIntentResult {
  intent: Intent;
  industry: "restaurant" | "salon" | "medical" | "fitness" | "saas" | "legal" | "education" | "portfolio" | "general";
  extractedInfo: ExtractedInfo;
}

const CLASSIFIER_SYSTEM_PROMPT = `You are an intent classifier for an AI website builder.
Given a user message and the conversation history, classify the user's intent into exactly one of these categories:
- build_request: The user is requesting to build, create, design, or start a new website.
- edit_request: The user is asking to modify, update, change, edit, styling tweaks, add/remove content or sections of an existing website.
- casual_chat: The user is greeting, asking a general question, coding help, explaining something, or just chatting.

Also detect the industry from keywords or theme of the message. It must be exactly one of: "restaurant", "salon", "medical", "fitness", "saas", "legal", "education", "portfolio", "general".

Also extract any info present in the message:
1. name: The name of the business/website if mentioned (e.g. "Âme Coffee", "Velara"). Otherwise null/empty.
2. location: The physical location, city, address, or region if mentioned. Otherwise null/empty.
3. colors: A list of any color names or hex codes mentioned (e.g. ["navy", "gold", "#fff"]). Otherwise empty array.

Output format must be valid JSON matching this schema:
{
  "intent": "build_request" | "casual_chat" | "edit_request",
  "industry": "restaurant" | "salon" | "medical" | "fitness" | "saas" | "legal" | "education" | "portfolio" | "general",
  "extractedInfo": {
    "name": string,
    "location": string,
    "colors": string[]
  }
}`;

export async function classifyIntent(
  message: string,
  conversationHistory: { role: string; content: string }[]
): Promise<StructuredIntentResult> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set in environment variables");
  }

  // Format history for classifier context
  const historySnippet = conversationHistory
    .slice(-5)
    .map(m => `${m.role.toUpperCase()}: ${m.content.slice(0, 300)}`)
    .join("\n");

  const userContent = `CONVERSATION HISTORY:\n${historySnippet}\n\nCURRENT USER MESSAGE:\n"${message}"\n\nClassify intent and extract details.`;

  try {
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
            { role: "user", content: userContent },
          ],
          max_tokens: 150,
          stream: false,
          temperature: 0,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Groq status ${response.status}`);
    }

    const data = await response.json();
    const rawContent: string = data.choices?.[0]?.message?.content ?? "";
    const parsed = JSON.parse(rawContent);

    return {
      intent: parsed.intent || "casual_chat",
      industry: parsed.industry || "general",
      extractedInfo: {
        name: parsed.extractedInfo?.name || "",
        location: parsed.extractedInfo?.location || "",
        colors: Array.isArray(parsed.extractedInfo?.colors) ? parsed.extractedInfo.colors : []
      }
    };
  } catch (err) {
    console.warn("[Classifier] LLM classification failed, using keyword fallback:", err);
    
    const cleanLower = message.toLowerCase();
    
    // Heuristic Fallback: Detect Intent
    let intent: Intent = "casual_chat";
    const buildKeywords = ["build", "create", "make", "design", "generate", "start", "new website"];
    const editKeywords = ["change", "update", "edit", "modify", "tweak", "add", "remove", "replace", "fix", "style"];
    
    const hasWebsite = conversationHistory.some(m => m.role === "assistant" && m.content.includes("<ONI_CODE>"));
    
    if (buildKeywords.some(kw => cleanLower.includes(kw))) {
      intent = "build_request";
    } else if (hasWebsite || editKeywords.some(kw => cleanLower.includes(kw))) {
      intent = "edit_request";
    }

    // Heuristic Fallback: Detect Industry
    let industry: any = "general";
    const industryKeywords: Record<string, string[]> = {
      restaurant: ["coffee", "cafe", "restaurant", "food", "bistro", "steak", "dining", "bakery", "kitchen"],
      salon: ["salon", "beauty", "hair", "spa", "stylist", "makeup", "cosmetic"],
      medical: ["medical", "clinic", "hospital", "dentist", "doctor", "health"],
      fitness: ["fitness", "gym", "workout", "trainer", "coach", "athlete"],
      saas: ["saas", "tech", "software", "dashboard", "app", "startup"],
      legal: ["legal", "lawyer", "law", "attorney", "firm"],
      education: ["education", "school", "university", "college", "course", "academy", "learn"],
      portfolio: ["portfolio", "design", "creative", "architecture", "developer", "resume", "cv"]
    };

    for (const [ind, keywords] of Object.entries(industryKeywords)) {
      if (keywords.some(kw => cleanLower.includes(kw))) {
        industry = ind;
        break;
      }
    }

    // Heuristic Fallback: Extract Colors
    const colorList = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white", "gray", "grey", "gold", "silver", "navy", "bronze", "copper", "ivory", "cream"];
    const colors = colorList.filter(color => cleanLower.includes(color));

    return {
      intent,
      industry,
      extractedInfo: {
        name: "",
        location: "",
        colors
      }
    };
  }
}
