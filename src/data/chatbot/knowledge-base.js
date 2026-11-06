/**
 * Knowledge Base Re-export & Backward Compatibility Bridge
 * The authoritative source of truth is now organized under src/data/chatbot/knowledge/
 */
import {
  knowledgeRegistry,
  allProjects,
  portfolioFaqs
} from "./knowledge/index.js";

export const knowledgeBase = allProjects;
export const followUps = {
  about: [
    "What is Harshit's academic background?",
    "What are his strongest technical areas?",
    "What roles is he seeking?"
  ],
  triforge: [
    "Explain TriForge's 3-stream architecture.",
    "What datasets and results did TriForge achieve?",
    "What are TriForge's limitations?"
  ],
  ids: [
    "Explain the AI Agentic IDS project.",
    "What models and datasets were used in AI Agentic IDS?",
    "How does AI Agentic IDS use explainable AI?"
  ],
  projects: [
    "What is Harshit's strongest project?",
    "Which project should an interviewer ask about?",
    "List all available projects and repositories."
  ],
  default: [
    "What is Harshit's strongest project?",
    "Explain his AI Agentic IDS.",
    "What are his strongest technical skills?"
  ]
};

export { knowledgeRegistry, allProjects, portfolioFaqs };
