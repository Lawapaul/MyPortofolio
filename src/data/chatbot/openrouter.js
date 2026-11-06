/**
 * OpenRouter Free Model Client Engine
 * Exclusively executes free models on OpenRouter with strict validation and fallback chains.
 */

export const FREE_FALLBACK_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemini-2.0-flash-lite-preview-02-05:free",
  "qwen/qwen-2.5-coder-32b-instruct:free",
  "mistralai/mistral-small-24b-instruct-2501:free",
  "deepseek/deepseek-r1-distill-llama-70b:free",
  "google/gemini-2.0-flash-exp:free",
  "openrouter/free"
];

/**
 * Validates that a model ID is strictly free.
 */
export function isFreeModel(modelId) {
  if (typeof modelId !== "string") return false;
  const trimmed = modelId.trim();
  if (trimmed === "openrouter/free") return true;
  return trimmed.endsWith(":free");
}

/**
 * Builds the prioritized chain of free models to try, ensuring no paid model ever enters.
 */
export function buildFreeModelChain(configuredModel) {
  const chain = [];
  if (configuredModel && isFreeModel(configuredModel)) {
    chain.push(configuredModel.trim());
  }
  for (const fallback of FREE_FALLBACK_MODELS) {
    if (!chain.includes(fallback) && isFreeModel(fallback)) {
      chain.push(fallback);
    }
  }
  return chain;
}

/**
 * Parses markdown output to extract the main answer and any suggested follow-up questions.
 */
export function parseModelResponse(rawText, fallbackSuggestions = []) {
  if (typeof rawText !== "string" || !rawText.trim()) {
    return {
      answer: "I don't have verified information about that yet. You can explore Harshit's portfolio or contact him directly for more details.",
      suggestions: fallbackSuggestions.slice(0, 3)
    };
  }

  let text = rawText.trim();
  
  // Check if model returned a JSON block
  if (text.startsWith("{") && text.endsWith("}")) {
    try {
      const parsed = JSON.parse(text);
      if (typeof parsed.answer === "string") {
        return {
          answer: parsed.answer.trim(),
          suggestions: Array.isArray(parsed.suggestions) && parsed.suggestions.length
            ? parsed.suggestions.filter((s) => typeof s === "string").slice(0, 3)
            : fallbackSuggestions.slice(0, 3)
        };
      }
    } catch {
      // Continue to markdown parsing
    }
  }

  // Extract suggestions from markdown if formatted as ### Suggested Follow-ups or similar
  const suggestionRegex = /(?:###?\s*(?:Suggested|Follow-up|Related|Questions)[^\n]*\n)([\s\S]*)$/i;
  const match = text.match(suggestionRegex);
  const suggestions = [];

  if (match && match[1]) {
    const listBlock = match[1].trim();
    const lines = listBlock.split("\n");
    for (const line of lines) {
      const cleaned = line.replace(/^[\s*\-–—\d.)\]>]+\s*/, "").trim();
      if (cleaned.length > 5 && cleaned.length < 120 && cleaned.endsWith("?")) {
        suggestions.push(cleaned);
      }
    }
    // Remove the suggestions block from the main answer to keep clean presentation
    text = text.slice(0, match.index).trim();
  }

  const finalSuggestions = suggestions.length >= 2
    ? suggestions.slice(0, 3)
    : fallbackSuggestions.slice(0, 3);

  return {
    answer: text,
    suggestions: finalSuggestions
  };
}

/**
 * Executes chat completion against OpenRouter using free models exclusively.
 */
export async function callOpenRouterFree({
  apiKey,
  configuredModel,
  messages,
  maxTokens = 1500,
  siteUrl = "http://localhost:8080",
  fetchFn = fetch,
  timeoutMs = 35000
}) {
  if (!apiKey) {
    return {
      success: false,
      statusCode: 503,
      error: "not_configured",
      message: "OpenRouter is not configured for this environment. Set the server-side OPENROUTER_API_KEY to enable chat."
    };
  }

  if (configuredModel && !isFreeModel(configuredModel)) {
    return {
      success: false,
      statusCode: 503,
      error: "model_unavailable",
      message: "This chat model is not available. Choose a supported OpenRouter model."
    };
  }

  const modelChain = buildFreeModelChain(configuredModel);
  let lastError = null;

  for (let i = 0; i < modelChain.length; i++) {
    const model = modelChain[i];

    // Double-check safety invariant: NEVER call a non-free model
    if (!isFreeModel(model)) {
      continue;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetchFn("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": siteUrl,
          "X-Title": "Ask About Harshit (Free Model)"
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: maxTokens,
          temperature: 0.4
        })
      });

      clearTimeout(timeout);

      // Handle specific status codes
      if (response.status === 401 || response.status === 403) {
        return {
          success: false,
          statusCode: 503,
          error: "provider_auth_failure",
          message: "OpenRouter couldn't authorize this key. Check OPENROUTER_API_KEY in the server environment."
        };
      }

      if (response.status === 429) {
        // Rate limited on this free model; try next free model in chain
        console.warn(`[OpenRouter] Rate limited (429) on free model ${model}. Attempting fallback...`);
        lastError = { statusCode: 429, error: "quota_exhausted", message: "Rate limit reached on free model." };
        continue;
      }

      if (response.status === 404 || response.status === 502 || response.status === 503 || response.status === 504 || response.status === 500) {
        console.warn(`[OpenRouter] HTTP ${response.status} on free model ${model}. Attempting fallback...`);
        lastError = { statusCode: response.status, error: "provider_error", message: `HTTP ${response.status} from ${model}` };
        continue;
      }

      if (!response.ok) {
        console.warn(`[OpenRouter] Non-OK status ${response.status} on model ${model}.`);
        lastError = { statusCode: response.status, error: "provider_error", message: "API call failed" };
        continue;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      const rawText = typeof content === "string"
        ? content
        : Array.isArray(content)
          ? content.map((c) => c.text || "").join("")
          : "";

      if (!rawText.trim()) {
        console.warn(`[OpenRouter] Empty response content from ${model}. Attempting fallback...`);
        lastError = { statusCode: 502, error: "empty_response", message: "Model returned empty content" };
        continue;
      }

      // Success!
      return {
        success: true,
        modelUsed: model,
        rawContent: rawText
      };

    } catch (err) {
      clearTimeout(timeout);
      const isAbort = err?.name === "AbortError";
      console.warn(`[OpenRouter] ${isAbort ? "Timeout" : "Network error"} on model ${model}:`, err?.message);
      lastError = {
        statusCode: 504,
        error: isAbort ? "timeout" : "network_error",
        message: err?.message
      };
      // Try next free model in fallback chain
      continue;
    }
  }

  // If every free model failed:
  return {
    success: false,
    statusCode: 503,
    error: "all_free_models_failed",
    message: "AI assistant is temporarily unavailable. Please try again later.",
    lastError
  };
}

