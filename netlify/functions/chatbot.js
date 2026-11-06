import { retrieveContext } from "../../src/data/chatbot/retrieval.js";
import { callOpenRouterFree, parseModelResponse } from "../../src/data/chatbot/openrouter.js";

const DEFAULT_MODEL = "openrouter/free";
const QUOTA_MESSAGE = "AI assistant is temporarily unavailable. Please try again later.";
const headers = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff"
};
const attempts = new Map();

function respond(statusCode, payload) {
  return { statusCode, headers, body: JSON.stringify(payload) };
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < 10 * 60_000);
  if (recent.length >= 15) {
    attempts.set(ip, recent);
    return true;
  }
  recent.push(now);
  attempts.set(ip, recent);
  if (attempts.size > 5000) {
    for (const [key, values] of attempts) {
      if (!values.some((time) => now - time < 10 * 60_000)) attempts.delete(key);
    }
  }
  return false;
}

export function buildSystemPrompt(contextText, isGeneralTech = false) {
  return `You are Harshit's personal AI portfolio assistant. You help visitors, recruiters, interviewers, developers, and technical professionals understand Harshit Singh Shekhawat's profile, education, skills, projects, achievements, technical interests, and career goals.

CORE IDENTITY & OBJECTIVE:
- You represent Harshit's portfolio knowledge accurately, professionally, and naturally. You are an AI assistant for Harshit, not Harshit himself.
- Be conversational, technically articulate, engaging, and evidence-based. Avoid sounding like a rigid FAQ lookup table.

BEHAVIORAL RULES:
1. SOURCE OF TRUTH: Use the supplied portfolio notes below as the primary source of truth for all personal facts, academic records, project metrics, and background details.
2. NATURAL LANGUAGE & REASONING: Understand natural language questions. Synthesize, compare, and connect facts across different portfolio sections.
3. CONVERSATION CONTEXT & FOLLOW-UPS: Resolve pronouns and contextual references ("it", "its architecture", "its limitations", "the other project") using the conversation history.
4. HONESTY & FIDELITY: Never invent personal achievements, fake metrics, unverified contest ratings, or unlisted credentials. Treat figures labeled "last reported" as historical milestones and direct users to live profiles for real-time counts.
5. GENERAL TECHNICAL QUESTIONS: ${
  isGeneralTech
    ? "The user is asking a general computer science or AI concept question. Answer using your comprehensive AI/CS knowledge. Clearly and accurately explain the theory, architecture, or concept. If Harshit has implemented or explored this technology in his portfolio, mention where and how he used it; if not, do not claim he built it."
    : "For general technical inquiries, provide clear, comprehensive technical explanations, noting where Harshit has applied these technologies in his projects without falsely claiming invention of general concepts."
}
6. PROJECT EVALUATIONS & COMPARISONS:
   - When asked what Harshit's "best", "strongest", or "most challenging" project is, distinguish between:
     A) Harshit's explicitly documented personal perspective: TriForge best represents his advanced deep learning and computer vision capabilities, and AI Agentic IDS and TriForge are his two most technically challenging projects.
     B) The assistant's independent, evidence-based comparative evaluation across projects based on complexity, architectural sophistication, models used, datasets, verified metrics, and role suitability.
   - For role-specific questions (e.g. AI Engineer vs Computer Vision vs Cybersecurity), tailor the recommendation using verified project evidence.
7. MISSING DETAILS: When a detail is genuinely unverified (e.g., TriForge's GitHub archive is pending verification, exact live contest ratings change daily), state this transparently without refusing the broader question.
8. CONTACT & LINKS: Use only exact verified links:
   - Email: harshitshekhawat501@gmail.com
   - LinkedIn: https://www.linkedin.com/in/harshitshekhawat/
   - GitHub: https://github.com/Lawapaul
   - LeetCode: https://leetcode.com/u/harshit_shekhawat/
   - GeeksforGeeks: https://www.geeksforgeeks.org/profile/surfe6mip
   - Codeforces: https://codeforces.com/profile/harshitshekhawat501?utm=codolio
   - CodeChef: https://www.codechef.com/users/surfer_w96?utm=codolio
   - Codolio: https://codolio.com/profile/surferw96
   - Project Repositories: Provide exact repository URLs for AI Agentic IDS, Plant Disease, ParkVision, Smart Irrigation, SecureSign, Knowledge Graph, PadharooGo, and Netra.
   - Never disclose phone numbers, home address, passwords, or confidential information.
9. OUTPUT FORMAT:
   - Provide answers in clear GitHub-flavored markdown (bullet points, bold text, code blocks, or tables where appropriate).
   - End your response with 2 to 3 relevant follow-up questions formatted exactly as:
### Suggested Follow-ups
- [Question 1]?
- [Question 2]?
- [Question 3]?

SUPPLIED PORTFOLIO KNOWLEDGE BASE:
${contextText}`;
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return respond(405, { error: "method_not_allowed", message: "Use POST to send a message." });
  }

  if (Number(event.headers?.["content-length"] || 0) > 32_000 || Buffer.byteLength(event.body || "", "utf8") > 32_000) {
    return respond(413, { error: "too_large", message: "That request is too large. Please shorten your message." });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return respond(400, { error: "bad_json", message: "Please send a valid message." });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 2000) {
    return respond(400, { error: "invalid_message", message: "Messages must be between 1 and 2,000 characters." });
  }

  const rawHistory = Array.isArray(body.history) ? body.history : [];
  if (rawHistory.some((item) => !item || !["user", "model", "assistant"].includes(item.role) || typeof item.text !== "string" || item.text.length > 3000)) {
    return respond(400, { error: "invalid_history", message: "Conversation context is invalid. Start a new conversation and try again." });
  }

  const ip = event.headers?.["x-nf-client-connection-ip"] || event.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return respond(429, { error: "rate_limited", message: "You've sent several messages in a short time. Please wait a few minutes and try again." });
  }

  const key = process.env.OPENROUTER_API_KEY;
  const configuredModel = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

  if (!key) {
    return respond(503, {
      error: "not_configured",
      message: "OpenRouter is not configured for this environment. Set the server-side OPENROUTER_API_KEY to enable chat."
    });
  }

  // Retrieve intelligent context using multi-source knowledge and conversation memory
  const historyWindow = rawHistory.slice(-8).map((item) => ({
    role: item.role === "model" ? "assistant" : item.role,
    text: item.text
  }));

  const { contextText, isGeneralTech, suggestedQuestions, matchedProjectIds } = retrieveContext(message, historyWindow);
  const systemPrompt = buildSystemPrompt(contextText, isGeneralTech);

  const messages = [
    { role: "system", content: systemPrompt },
    ...historyWindow.map((item) => ({ role: item.role, content: item.text })),
    { role: "user", content: message }
  ];

  try {
    const result = await callOpenRouterFree({
      apiKey: key,
      configuredModel,
      messages,
      maxTokens: 1600,
      siteUrl: process.env.SITE_URL || "http://localhost:8080"
    });

    if (!result.success) {
      console.error("[chatbot] OpenRouter execution error:", result);
      return respond(result.statusCode || 503, {
        error: result.error || "provider_error",
        message: result.message || QUOTA_MESSAGE
      });
    }

    const { answer, suggestions } = parseModelResponse(result.rawContent, suggestedQuestions);

    return respond(200, {
      answer,
      suggestions,
      modelUsed: result.modelUsed,
      matchedProjects: matchedProjectIds
    });
  } catch (err) {
    console.error("[chatbot] Unexpected error in chatbot handler:", err);
    return respond(502, {
      error: "network_error",
      message: "I couldn't reach the assistant just now. Please try again."
    });
  }
};
