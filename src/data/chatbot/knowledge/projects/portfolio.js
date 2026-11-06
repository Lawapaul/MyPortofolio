export const portfolioProject = {
  id: "personal-portfolio",
  name: "Personal Portfolio Website (MyPortofolio-V2)",
  shortName: "Portfolio Website",
  category: "Full-Stack Web Engineering & Interactive Graphics",
  overview: "Harshit's interactive personal portfolio website showcasing his engineering journey, technical expertise, research projects, coding profiles, and an integrated AI assistant powered by OpenRouter free LLM models.",
  problemStatement: "Technical recruiters and visitors need an immersive, responsive, and verifiable window into an engineer's actual code, architecture, academic milestones, and problem-solving background.",
  motivation: "Create a modern, dark-themed, cinematic developer portfolio blending responsive React design, 3D interactive graphics (Three.js / React Three Fiber), and a server-side AI chatbot.",
  objectives: "Deliver an optimized portfolio with fast load times, modular architecture, verified external repository links, live coding profile statistics, and an AI conversational partner.",
  technologies: [
    "React 18",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "Three.js",
    "@react-three/fiber",
    "@react-three/drei",
    "Framer Motion",
    "GSAP",
    "Netlify Functions (Serverless Node.js backend)",
    "OpenRouter Free LLM API"
  ],
  architecture: "Single Page Application (SPA) with serverless function backend: React 18 frontend with client-side routing, Three.js 3D mascot rendering, Tailwind styling, and a serverless Netlify function (`chatbot.js`) connecting to OpenRouter for server-side AI inference.",
  workflow: "User visits site -> React renders responsive pages -> Three.js renders interactive 3D character -> User opens AI chatbot -> Messages dispatched to `/.netlify/functions/chatbot` -> Server retrieves curated knowledge and queries OpenRouter free models -> Conversational response returned.",
  algorithms: [
    "Semantic & Hybrid Keyword Context Retrieval",
    "Conversation History Entity Resolution",
    "3D Procedural Mesh & Lighting Animation",
    "Dynamic Client-Side Routing"
  ],
  models: [
    "Free LLMs via OpenRouter (e.g. meta-llama/llama-3.3-70b-instruct:free, openrouter/free, etc.)"
  ],
  datasets: [],
  preprocessing: "Curated multi-domain portfolio knowledge base parsing, question intent classification, and conversation history windowing.",
  trainingDetails: "Not applicable (Web engineering and LLM orchestration).",
  evaluationMetrics: [
    "Lighthouse Performance Scores",
    "Build Size and Tree-Shaking Efficiency",
    "Zero API Key Exposure (100% server-side isolation)"
  ],
  results: {
    frontend: "Modern, high-performance responsive portfolio with cinematic backdrop and 3D graphics",
    aiChatbot: "Fully integrated serverless AI assistant using OpenRouter free models exclusively",
    security: "Zero client-side secrets; environment variable protection in Netlify Functions"
  },
  individualContribution: "Designed, engineered, and deployed complete website from scratch, including UI design, Three.js 3D mascot, component architecture, and serverless AI chatbot backend.",
  challenges: "Balancing heavy 3D rendering with mobile performance, ensuring strict API key security on serverless hosting, and optimizing free-model LLM responses with zero paid dependencies.",
  limitations: "Free LLM endpoints can be subject to external provider rate limits; handled via graceful fallback chains.",
  futureImprovements: "Live LeetCode & GfG API stat widgets, offline PWA caching, and blog/article section for deep-dive technical write-ups.",
  completionStatus: "Completed and actively maintained.",
  repositoryUrl: "https://github.com/Lawapaul/MyPortofolio",
  liveDemoUrl: null,
  relatedQuestions: [
    "How was this portfolio website built?",
    "What technologies are used in the portfolio?",
    "How does the AI chatbot work under the hood?",
    "Where is the portfolio source code repository?"
  ]
};

