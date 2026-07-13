import type { Intent } from "./classifier";

export interface RouteConfig {
  model: string;
  apiUrl: string;
  maxTokens: number;
  creditCost: number;
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const INTENT_ROUTE_MAP: Record<Intent, RouteConfig> = {
  build_request: {
    model: "llama-3.3-70b-versatile",
    apiUrl: GROQ_API_URL,
    maxTokens: 16000,
    creditCost: 8,
  },
  edit_request: {
    model: "llama-3.3-70b-versatile",
    apiUrl: GROQ_API_URL,
    maxTokens: 16000,
    creditCost: 3,
  },
  casual_chat: {
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
