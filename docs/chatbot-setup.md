# Ask About Harshit — AI Assistant Architecture & Setup Guide

The assistant is a full-stack, server-side retrieval-augmented AI conversational partner powered exclusively by **OpenRouter Free Models**.

The client browser never receives the server API key, provider configuration, or internal retrieval prompts.

---

## Architecture Overview

```
User Query / History
         │
         ▼
[ ChatbotPanel (React 18 + TypeScript) ]
         │ (POST /.netlify/functions/chatbot)
         ▼
[ Netlify Serverless Function: chatbot.js ]
         │
         ├──► [ Context Retrieval & Anaphora Engine: retrieval.js ]
         │         └── Entity tracking & question intent classifier
         │
         ├──► [ Comprehensive Knowledge Base: src/data/chatbot/knowledge/ ]
         │         ├── profile/ (about, education, career, personal, working-style)
         │         ├── technical/ (languages, ML, DL, CV, NLP, XAI, RL, tools)
         │         ├── projects/ (independent schema records for all 10 projects)
         │         ├── achievements/ (LeetCode 830+, GfG Rank 4, Codeforces, IBM GenAI)
         │         ├── contact/ (email, LinkedIn, verified GitHub repos)
         │         ├── faqs/ (15 comprehensive original FAQs)
         │         └── reasoning/ (multi-criteria comparative evaluation engine)
         │
         ├──► [ OpenRouter Free Model Client: openrouter.js ]
         │         ├── Free-model validation (strictly ending in :free or openrouter/free)
         │         ├── Zero-paid-fallback guarantee
         │         └── Prioritized fallback chain (Llama 3.3, Gemini 2.0 Flash Lite, Qwen 2.5, etc.)
         │
         ▼
[ Conversational Markdown Response + Dynamic Grounded Suggestions ]
```

---

## Free-Only OpenRouter Configuration

1. Obtain a free API key at [OpenRouter](https://openrouter.ai/settings/keys).
2. Set server-side environment variables in `.env` (or in Netlify site settings):
   ```sh
   OPENROUTER_API_KEY=sk-or-v1-...
   OPENROUTER_MODEL=openrouter/free
   ```
3. **Free Model Safeguard**: The engine rejects any model ID that is not `openrouter/free` and does not end in `:free`. Under no circumstances will a paid model or paid API fallback ever be invoked.
4. If rate limits (429), timeouts (504), or provider outages (502/503) occur on the primary free model, the engine automatically attempts fallback across the free model sequence:
   - `meta-llama/llama-3.3-70b-instruct:free`
   - `google/gemini-2.0-flash-lite-preview-02-05:free`
   - `qwen/qwen-2.5-coder-32b-instruct:free`
   - `mistralai/mistral-small-24b-instruct-2501:free`
   - `deepseek/deepseek-r1-distill-llama-70b:free`
   - `openrouter/free`
5. If all free models are exhausted, the API cleanly returns:
   `"AI assistant is temporarily unavailable. Please try again later."`

---

## Verified Repositories & Contacts

- **Professional Email**: `harshitshekhawat501@gmail.com`
- **LinkedIn**: https://www.linkedin.com/in/harshitshekhawat/
- **GitHub**: https://github.com/Lawapaul
- **LeetCode**: https://leetcode.com/u/harshit_shekhawat/ (830+ problems solved)
- **GeeksforGeeks**: https://www.geeksforgeeks.org/profile/surfe6mip (University Rank 4, ~300 problems solved)
- **Codeforces**: https://codeforces.com/profile/harshitshekhawat501?utm=codolio
- **CodeChef**: https://www.codechef.com/users/surfer_w96?utm=codolio
- **Codolio**: https://codolio.com/profile/surferw96
- **Project Repositories**:
  - TriForge: Pending repository archive verification
  - AI Agentic IDS: https://github.com/Lawapaul/AI_Agentic_DL
  - Explainable Plant Disease: https://github.com/Lawapaul/Explainable_Plant_Disease_Prediction
  - ParkVision: https://github.com/Lawapaul/Smart-Parking-Guidance-and-Number-Plate-Recognition-System
  - Smart Irrigation: https://github.com/Lawapaul/Smart-Irrigation-System
  - SecureSign: https://github.com/Lawapaul/SecureSign-RSA-Based-Digital-Signature-and-File-Integrity-Verification-System
  - Knowledge Graph: https://github.com/Lawapaul/Knowledge_Graph_using_enhanced_NLP
  - PadharooGo: https://github.com/Lawapaul/PadharooGo-Full-stack-end-to-end-platform-for-travel-stays
  - Netra: https://github.com/Lawapaul/Netra---Sonar-Mapping-System
  - Personal Portfolio: https://github.com/Lawapaul/MyPortofolio

---

## Automated Verification Tests

Run the complete 40+ automated test suite using:

```sh
npm test
```

This verifies:
- All 8 portfolio inquiry paths
- All 12 project-specific deep-dive questions
- Comparative reasoning and multi-criteria project evaluation
- Conversation memory and anaphoric pronoun resolution
- General computer science / AI technical explanations
- Provider failures (401, 403, 429, 503, timeouts, malformed inputs)
- Strict free-model isolation invariants
