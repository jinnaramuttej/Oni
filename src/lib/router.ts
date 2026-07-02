import type { Intent } from "./classifier";

export interface RouteConfig {
  model: string;
  apiUrl: string;
  maxTokens: number;
  creditCost: number;
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const INTENT_ROUTE_MAP: Record<Intent, RouteConfig> = {
  change_text: {
    model: "llama-3.1-8b-instant",
    apiUrl: GROQ_API_URL,
    maxTokens: 2000,
    creditCost: 1,
  },
  change_color: {
    model: "llama-3.1-8b-instant",
    apiUrl: GROQ_API_URL,
    maxTokens: 2000,
    creditCost: 1,
  },
  change_layout: {
    model: "llama-3.1-8b-instant",
    apiUrl: GROQ_API_URL,
    maxTokens: 2000,
    creditCost: 1,
  },
  add_section: {
    model: "llama-3.3-70b-versatile",
    apiUrl: GROQ_API_URL,
    maxTokens: 6000,
    creditCost: 3,
  },
  remove_section: {
    model: "llama-3.3-70b-versatile",
    apiUrl: GROQ_API_URL,
    maxTokens: 6000,
    creditCost: 3,
  },
  new_website: {
    model: "llama-3.3-70b-versatile",
    apiUrl: GROQ_API_URL,
    maxTokens: 16000,
    creditCost: 8,
  },
  full_redesign: {
    model: "llama-3.3-70b-versatile",
    apiUrl: GROQ_API_URL,
    maxTokens: 16000,
    creditCost: 12,
  },
  casual: {
    model: "llama-3.1-8b-instant",
    apiUrl: GROQ_API_URL,
    maxTokens: 200,
    creditCost: 0,
  },
};

/**
 * Given a classified intent, returns the model, API URL, max tokens,
 * and credit cost to use for the generation request.
 */
export function routeIntent(intent: Intent): RouteConfig {
  const config = INTENT_ROUTE_MAP[intent];
  if (!config) {
    throw new Error(`Unknown intent: "${intent}"`);
  }
  return config;
}
