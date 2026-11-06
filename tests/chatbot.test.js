import { test, describe } from "node:test";
import assert from "node:assert/strict";

import { retrieveContext } from "../src/data/chatbot/retrieval.js";
import {
  isFreeModel,
  buildFreeModelChain,
  parseModelResponse,
  callOpenRouterFree
} from "../src/data/chatbot/openrouter.js";
import { handler, buildSystemPrompt } from "../netlify/functions/chatbot.js";
import {
  allProjects,
  projectsById,
  knowledgeRegistry
} from "../src/data/chatbot/knowledge/index.js";

describe("Complete 40-Step Portfolio Chatbot Verification Suite", () => {
  // =========================================================================
  // GROUP 1: PORTFOLIO TESTS (1 to 8)
  // =========================================================================
  describe("Group 1: Portfolio Tests", () => {
    test("1. Introduce Harshit: retrieves personal intro & background", () => {
      const { contextText } = retrieveContext("Introduce Harshit.");
      assert.ok(contextText.includes("Harshit Singh Shekhawat"), "Should include full name");
      assert.ok(contextText.includes("VIT Chennai"), "Should mention VIT Chennai");
      assert.ok(contextText.includes("Artificial Intelligence"), "Should mention AI/ML specialization");
    });

    test("2. What is his current academic status?: retrieves B.Tech CSE AIML", () => {
      const { contextText } = retrieveContext("What is his current academic status?");
      assert.ok(contextText.includes("Bachelor of Technology"), "Should include B.Tech");
      assert.ok(contextText.includes("May 2027"), "Should include May 2027 expected graduation");
    });

    test("3. What is his CGPA?: retrieves verified 8.95 CGPA", () => {
      const { contextText } = retrieveContext("What is his CGPA?");
      assert.ok(contextText.includes("8.95"), "Should explicitly include 8.95 CGPA");
      assert.ok(contextText.includes("10"), "Should specify 10-point scale");
    });

    test("4. Which programming languages does he know?: retrieves Python, C++, etc.", () => {
      const { contextText } = retrieveContext("Which programming languages does he know?");
      assert.ok(contextText.includes("Python"), "Should include Python");
      assert.ok(contextText.includes("C++"), "Should include C++");
      assert.ok(contextText.includes("SQL"), "Should include SQL");
      assert.ok(contextText.includes("JavaScript"), "Should include JavaScript");
    });

    test("5. What are his strongest technical areas?: retrieves ML, DL, CV, DSA", () => {
      const { contextText } = retrieveContext("What are his strongest technical areas?");
      assert.ok(contextText.includes("Machine Learning"), "Should include ML");
      assert.ok(contextText.includes("Deep Learning"), "Should include DL");
      assert.ok(contextText.includes("Computer Vision"), "Should include CV");
      assert.ok(contextText.includes("830"), "Should mention 830+ LeetCode problems");
    });

    test("6. What is he currently learning?: retrieves GenAI, LLMs, RAG, MLOps", () => {
      const { contextText } = retrieveContext("What is he currently learning?");
      assert.ok(contextText.includes("Generative AI"), "Should include Generative AI");
      assert.ok(contextText.includes("Large Language Models"), "Should include LLMs");
      assert.ok(contextText.includes("RAG"), "Should include RAG");
    });

    test("7. What are his career goals?: retrieves AI Engineer, ML Engineer roles", () => {
      const { contextText } = retrieveContext("What are his career goals?");
      assert.ok(contextText.includes("AI Engineer"), "Should include AI Engineer");
      assert.ok(contextText.includes("Machine Learning Engineer"), "Should include ML Engineer");
      assert.ok(contextText.includes("May 2027"), "Should include graduation timeline");
    });

    test("8. How can recruiters contact him?: retrieves harshitshekhawat501@gmail.com and LinkedIn", () => {
      const { contextText } = retrieveContext("How can recruiters contact him?");
      assert.ok(contextText.includes("harshitshekhawat501@gmail.com"), "Should include verified email");
      assert.ok(contextText.includes("linkedin.com/in/harshitshekhawat"), "Should include LinkedIn URL");
    });
  });

  // =========================================================================
  // GROUP 2: PROJECT TESTS (9 to 20)
  // =========================================================================
  describe("Group 2: Project Tests", () => {
    test("9. What is Harshit's best project?: retrieves global evaluation + TriForge & IDS", () => {
      const res = retrieveContext("What is Harshit's best project?");
      assert.ok(res.isGlobalEvaluation, "Should flag as global evaluation");
      assert.ok(res.contextText.includes("TriForge"), "Should include TriForge");
      assert.ok(res.contextText.includes("AI Agentic IDS"), "Should include AI Agentic IDS");
      assert.ok(res.contextText.includes("Documented Stated Opinion"), "Should mention documented opinion");
    });

    test("10. Why is TriForge important?: highlights 3-stream fusion & best representative stature", () => {
      const { contextText } = retrieveContext("Why is TriForge important?");
      assert.ok(contextText.includes("TriForge"), "Should mention TriForge");
      assert.ok(contextText.includes("BEST REPRESENTS"), "Should note personal profile stature");
    });

    test("11. Explain TriForge's complete architecture: spatial, frequency FFT, edge Canny", () => {
      const { contextText } = retrieveContext("Explain TriForge's complete architecture.");
      assert.ok(contextText.includes("Spatial"), "Should describe spatial stream");
      assert.ok(contextText.includes("Fast Fourier Transform"), "Should describe FFT frequency stream");
      assert.ok(contextText.includes("Canny"), "Should describe differentiable Canny edge stream");
      assert.ok(contextText.includes("Feature Fusion"), "Should describe fusion layer");
    });

    test("12. What datasets were used in TriForge?: CASIA v2, 4CAM, CASIA v1, COVERAGE", () => {
      const { contextText } = retrieveContext("What datasets were used in TriForge?");
      assert.ok(contextText.includes("CASIA v2"), "Should include CASIA v2");
      assert.ok(contextText.includes("4CAM"), "Should include 4CAM");
      assert.ok(contextText.includes("CASIA v1"), "Should include CASIA v1");
      assert.ok(contextText.includes("COVERAGE"), "Should include COVERAGE");
    });

    test("13. What were its evaluation results?: verifies exact benchmark metrics", () => {
      const { contextText } = retrieveContext("What were its evaluation results?", [{ role: "user", text: "Explain TriForge." }]);
      assert.ok(contextText.includes("97.0%"), "Should include 97.0% accuracy on CASIA v2");
      assert.ok(contextText.includes("87.1%"), "Should include 87.1% accuracy on 4CAM");
      assert.ok(contextText.includes("0.938"), "Should include 0.938 ROC-AUC");
    });

    test("14. What are its limitations?: cross-dataset generalization challenges", () => {
      const { contextText } = retrieveContext("What are its limitations?", [{ role: "user", text: "Explain TriForge." }]);
      assert.ok(contextText.includes("generalization"), "Should note generalization challenges");
      assert.ok(contextText.includes("COVERAGE") || contextText.includes("CASIA v1"), "Should mention tough datasets");
    });

    test("15. Explain AI Agentic IDS: deep learning, CICIDS2017, explainability, graph", () => {
      const { contextText } = retrieveContext("Explain AI Agentic IDS.");
      assert.ok(contextText.includes("CICIDS2017"), "Should mention CICIDS2017");
      assert.ok(contextText.includes("98.40%"), "Should mention 98.40% accuracy");
      assert.ok(contextText.includes("SHAP") || contextText.includes("LIME"), "Should mention explainability");
    });

    test("16. What makes AI Agentic IDS technically challenging?: multi-agent, flow volume, graph", () => {
      const { contextText } = retrieveContext("What makes AI Agentic IDS technically challenging?");
      assert.ok(contextText.includes("class imbalance") || contextText.includes("CICIDS2017"), "Should mention volume or imbalance");
      assert.ok(contextText.includes("human-in-the-loop") || contextText.includes("NetworkX"), "Should mention HITL or Graph analytics");
    });

    test("17. Compare AI Agentic IDS and TriForge: retrieves both full records", () => {
      const { contextText, isComparison } = retrieveContext("Compare AI Agentic IDS and TriForge.");
      assert.ok(isComparison, "Should detect comparison intent");
      assert.ok(contextText.includes("TriForge"), "Should include TriForge");
      assert.ok(contextText.includes("AI Agentic IDS"), "Should include AI Agentic IDS");
    });

    test("18. Explain ParkVision: YOLOv8, EasyOCR, 396 parking slots", () => {
      const { contextText } = retrieveContext("Explain ParkVision.");
      assert.ok(contextText.includes("396"), "Should mention 396 parking slots");
      assert.ok(contextText.includes("YOLOv8"), "Should mention YOLOv8");
      assert.ok(contextText.includes("EasyOCR"), "Should mention EasyOCR");
    });

    test("19. Explain Smart Irrigation: 0.99870 R2, 100K records, ESP32", () => {
      const { contextText } = retrieveContext("Explain Smart Irrigation.");
      assert.ok(contextText.includes("0.99870"), "Should include 0.99870 R2");
      assert.ok(contextText.includes("100,000") || contextText.includes("100K"), "Should include 100K records");
      assert.ok(contextText.includes("ESP32"), "Should include ESP32");
    });

    test("20. List all available projects with their repository links", () => {
      const { contextText } = retrieveContext("List all available projects with their repository links.");
      assert.ok(contextText.includes("https://github.com/Lawapaul/AI_Agentic_DL"), "Includes AI Agentic IDS repo");
      assert.ok(contextText.includes("https://github.com/Lawapaul/Explainable_Plant_Disease_Prediction"), "Includes Plant Disease repo");
      assert.ok(contextText.includes("https://github.com/Lawapaul/Smart-Parking-Guidance-and-Number-Plate-Recognition-System"), "Includes ParkVision repo");
      assert.ok(contextText.includes("https://github.com/Lawapaul/Smart-Irrigation-System"), "Includes Smart Irrigation repo");
      assert.ok(contextText.includes("https://github.com/Lawapaul/SecureSign-RSA-Based-Digital-Signature-and-File-Integrity-Verification-System"), "Includes SecureSign repo");
      assert.ok(contextText.includes("https://github.com/Lawapaul/Knowledge_Graph_using_enhanced_NLP"), "Includes Knowledge Graph repo");
      assert.ok(contextText.includes("https://github.com/Lawapaul/PadharooGo-Full-stack-end-to-end-platform-for-travel-stays"), "Includes PadharooGo repo");
      assert.ok(contextText.includes("https://github.com/Lawapaul/Netra---Sonar-Mapping-System"), "Includes Netra repo");
    });
  });

  // =========================================================================
  // GROUP 3: REASONING & EVALUATION TESTS (21 to 25)
  // =========================================================================
  describe("Group 3: Reasoning & Evaluation Tests", () => {
    test("21. Which project demonstrates the strongest computer vision capabilities?: TriForge", () => {
      const { contextText } = retrieveContext("Which project demonstrates the strongest computer vision capabilities?");
      assert.ok(contextText.includes("TriForge"), "TriForge must be prioritized for CV");
      assert.ok(contextText.includes("Computer Vision"), "Identifies Computer Vision domain");
    });

    test("22. Which project is most relevant to cybersecurity?: AI Agentic IDS & SecureSign", () => {
      const { contextText } = retrieveContext("Which project is most relevant to cybersecurity?");
      assert.ok(contextText.includes("AI Agentic IDS"), "AI Agentic IDS prioritized for cyber");
      assert.ok(contextText.includes("CICIDS2017"), "Mentions CICIDS2017");
    });

    test("23. Which project is best suited to an AI Engineer role?: AI Agentic IDS", () => {
      const { contextText } = retrieveContext("Which project is best suited to an AI Engineer role?");
      assert.ok(contextText.includes("AI Agentic IDS"), "AI Agentic IDS recommended for AI Engineer role");
      assert.ok(contextText.includes("TriForge"), "TriForge also referenced");
    });

    test("24. Which project has the strongest verified evaluation evidence?: Smart Irrigation (0.99870 R2) & TriForge (4 datasets)", () => {
      const { contextText } = retrieveContext("Which project has the strongest verified evaluation evidence?");
      assert.ok(contextText.includes("0.99870") || contextText.includes("CASIA v2"), "Includes verified metric benchmarks");
    });

    test("25. Rank projects using available technical evidence: retrieves structured ranking matrix", () => {
      const { contextText } = retrieveContext("Rank his projects based on technical complexity.");
      assert.ok(contextText.includes("PROJECT REASONING & EVALUATION ENGINE"), "Includes evaluation engine guidance");
      assert.ok(contextText.includes("Architectural Complexity"), "Evaluates architectural complexity");
    });
  });

  // =========================================================================
  // GROUP 4: CONVERSATION MEMORY TESTS (26 to 30)
  // =========================================================================
  describe("Group 4: Conversation Memory & Entity Resolution Tests", () => {
    test("26. Ask about TriForge: retrieves TriForge directly", () => {
      const { matchedProjectIds } = retrieveContext("Tell me about TriForge.");
      assert.ok(matchedProjectIds.includes("triforge"), "Identifies TriForge");
    });

    test("27. Follow up: 'Explain its architecture.' resolves 'its' to TriForge", () => {
      const history = [
        { role: "user", text: "Tell me about TriForge." },
        { role: "assistant", text: "TriForge is an image forgery detection framework." }
      ];
      const { contextText, matchedProjectIds } = retrieveContext("Explain its architecture.", history);
      assert.ok(matchedProjectIds.includes("triforge"), "Resolves 'its' to TriForge");
      assert.ok(contextText.includes("Fast Fourier Transform"), "Includes TriForge architecture facts");
    });

    test("28. Follow up: 'What datasets were used?' resolves to active project", () => {
      const history = [
        { role: "user", text: "Tell me about TriForge." },
        { role: "assistant", text: "TriForge is an image forgery detection framework." }
      ];
      const { contextText, matchedProjectIds } = retrieveContext("What datasets were used?", history);
      assert.ok(matchedProjectIds.includes("triforge"), "Resolves to TriForge");
      assert.ok(contextText.includes("CASIA"), "Retrieves CASIA datasets");
    });

    test("29. Follow up: 'What are its limitations?' resolves to active project", () => {
      const history = [
        { role: "user", text: "Tell me about TriForge." },
        { role: "assistant", text: "TriForge was tested on CASIA." }
      ];
      const { contextText } = retrieveContext("What are its limitations?", history);
      assert.ok(contextText.includes("TriForge"), "Targets TriForge limitations");
      assert.ok(contextText.includes("generalization"), "Mentions cross-dataset generalization");
    });

    test("30. Ask: 'Compare it with his other major project.' triggers comparative retrieval", () => {
      const history = [
        { role: "user", text: "Explain TriForge." },
        { role: "assistant", text: "TriForge uses 3 streams for forgery detection." }
      ];
      const { contextText, isComparison } = retrieveContext("Compare it with his other major project.", history);
      assert.ok(isComparison, "Triggers comparison mode");
      assert.ok(contextText.includes("TriForge"), "Includes TriForge");
      assert.ok(contextText.includes("AI Agentic IDS"), "Includes AI Agentic IDS as the other major project");
    });
  });

  // =========================================================================
  // GROUP 5: GENERAL KNOWLEDGE TESTS (31 to 34)
  // =========================================================================
  describe("Group 5: General Knowledge Tests", () => {
    test("31. Explain transformers: flags as general technical question", () => {
      const { isGeneralTech } = retrieveContext("Explain transformers.");
      assert.strictEqual(isGeneralTech, true, "Flags concept question as general tech");
    });

    test("32. What is RAG?: flags as general tech & does not restrict to portfolio refusal", () => {
      const { isGeneralTech } = retrieveContext("What is RAG?");
      assert.strictEqual(isGeneralTech, true, "Flags RAG as general tech");
      const systemPrompt = buildSystemPrompt("Supplied notes", isGeneralTech);
      assert.ok(systemPrompt.includes("Answer using your comprehensive AI/CS knowledge"), "Instructs LLM to answer general concept");
    });

    test("33. Compare CNN and LSTM: flags as general tech comparison", () => {
      const { isGeneralTech } = retrieveContext("Compare CNN and LSTM.");
      assert.strictEqual(isGeneralTech, true, "Flags as general tech");
    });

    test("34. Explain reinforcement learning: flags as general tech and provides RL context", () => {
      const { isGeneralTech, contextText } = retrieveContext("Explain reinforcement learning.");
      assert.strictEqual(isGeneralTech, true, "Flags as general tech");
      assert.ok(contextText.includes("Q-Learning") || contextText.includes("Reinforcement"), "Provides RL context");
    });
  });

  // =========================================================================
  // GROUP 6: FAILURE & RELIABILITY TESTS (35 to 40)
  // =========================================================================
  describe("Group 6: Failure & Reliability Tests", () => {
    test("35. Invalid API key: returns 503 provider auth failure", async () => {
      const mockFetch = async () => ({
        status: 401,
        ok: false,
        json: async () => ({ error: { message: "Invalid API key" } })
      });

      const res = await callOpenRouterFree({
        apiKey: "bad-key",
        configuredModel: "openrouter/free",
        messages: [{ role: "user", content: "Hi" }],
        fetchFn: mockFetch
      });

      assert.strictEqual(res.success, false);
      assert.strictEqual(res.statusCode, 503);
      assert.strictEqual(res.error, "provider_auth_failure");
    });

    test("36. All free models unavailable: returns 503 with exact required message", async () => {
      // Simulate all models returning 503
      const mockFetch = async () => ({
        status: 503,
        ok: false,
        json: async () => ({ error: "Service unavailable" })
      });

      const res = await callOpenRouterFree({
        apiKey: "valid-key",
        configuredModel: "openrouter/free",
        messages: [{ role: "user", content: "Hi" }],
        fetchFn: mockFetch
      });

      assert.strictEqual(res.success, false);
      assert.strictEqual(res.statusCode, 503);
      assert.strictEqual(res.message, "AI assistant is temporarily unavailable. Please try again later.");
    });

    test("37. Rate limit exceeded (429): triggers fallback to next free model in chain", async () => {
      let callCount = 0;
      const calledModels = [];

      const mockFetch = async (url, opts) => {
        callCount++;
        const body = JSON.parse(opts.body);
        calledModels.push(body.model);

        if (callCount === 1) {
          // First model hits 429
          return { status: 429, ok: false, json: async () => ({ error: "Rate limit exceeded" }) };
        }
        // Second model succeeds
        return {
          status: 200,
          ok: true,
          json: async () => ({
            choices: [{ message: { content: "Fallback response successful." } }]
          })
        };
      };

      const res = await callOpenRouterFree({
        apiKey: "valid-key",
        configuredModel: "openrouter/free",
        messages: [{ role: "user", content: "Hi" }],
        fetchFn: mockFetch
      });

      assert.strictEqual(res.success, true);
      assert.strictEqual(callCount, 2, "Should have fallen back to second free model");
      assert.notStrictEqual(calledModels[0], calledModels[1], "Models must be different in fallback chain");
      assert.ok(isFreeModel(calledModels[0]) && isFreeModel(calledModels[1]), "All invoked models must be free");
    });

    test("38. Network timeout (AbortError): triggers fallback to next free model", async () => {
      let callCount = 0;
      const mockFetch = async () => {
        callCount++;
        if (callCount === 1) {
          const err = new Error("Request timed out");
          err.name = "AbortError";
          throw err;
        }
        return {
          status: 200,
          ok: true,
          json: async () => ({
            choices: [{ message: { content: "Recovered from timeout." } }]
          })
        };
      };

      const res = await callOpenRouterFree({
        apiKey: "valid-key",
        configuredModel: "openrouter/free",
        messages: [{ role: "user", content: "Hi" }],
        fetchFn: mockFetch
      });

      assert.strictEqual(res.success, true);
      assert.strictEqual(callCount, 2, "Should attempt next free model on timeout");
      assert.strictEqual(res.rawContent, "Recovered from timeout.");
    });

    test("39. Malformed API response: parses text cleanly without crash", () => {
      const parsed = parseModelResponse("Here is an answer.\n\n### Suggested Follow-ups\n- Question 1?\n- Question 2?");
      assert.strictEqual(parsed.answer, "Here is an answer.");
      assert.deepStrictEqual(parsed.suggestions, ["Question 1?", "Question 2?"]);

      // Empty or invalid input
      const emptyParsed = parseModelResponse("");
      assert.ok(emptyParsed.answer.includes("verified information"));
      assert.ok(Array.isArray(emptyParsed.suggestions));
    });

    test("40. Missing portfolio context / Unknown query: gracefully handles without error", () => {
      const { contextText } = retrieveContext("Something completely unrelated and bizarre 123456789.");
      assert.ok(contextText.includes("Harshit Singh Shekhawat"), "Falls back to verified profile summary");
      assert.ok(contextText.includes("VIT Chennai"), "Provides core context");
    });

    test("Security Invariant: Strictly rejects paid models", () => {
      assert.strictEqual(isFreeModel("openai/gpt-4o"), false);
      assert.strictEqual(isFreeModel("anthropic/claude-3.5-sonnet"), false);
      assert.strictEqual(isFreeModel("meta-llama/llama-3.1-70b-instruct"), false);
      assert.strictEqual(isFreeModel("meta-llama/llama-3.3-70b-instruct:free"), true);
      assert.strictEqual(isFreeModel("openrouter/free"), true);

      const chain = buildFreeModelChain("openai/gpt-4o"); // Paid model injected
      assert.ok(!chain.includes("openai/gpt-4o"), "Must NEVER include a paid model in the chain");
      assert.ok(chain.every((m) => isFreeModel(m)), "Every model in chain must be free");
    });
  });
});

