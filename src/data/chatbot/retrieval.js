import {
  knowledgeRegistry,
  aboutProfile,
  educationProfile,
  careerProfile,
  personalProfile,
  workingStyleProfile,
  programmingLanguagesSkill,
  machineLearningSkill,
  deepLearningSkill,
  computerVisionSkill,
  nlpSkill,
  explainableAiSkill,
  reinforcementLearningSkill,
  frameworksAndToolsSkill,
  allProjects,
  projectsById,
  competitiveProgrammingAchievement,
  certificationsAchievement,
  academicAchievements,
  professionalProfilesContact,
  portfolioFaqs,
  projectEvaluationFramework,
  getComparativeEvaluation
} from "./knowledge/index.js";

// Aliases mapping colloquial names or abbreviations to project IDs
const PROJECT_ALIASES = {
  triforge: "triforge",
  "tri-forge": "triforge",
  "tri forge": "triforge",
  forgery: "triforge",
  "image forgery": "triforge",
  casia: "triforge",
  "4cam": "triforge",
  coverage: "triforge",

  "ai agentic ids": "ai-agentic-ids",
  "agentic ids": "ai-agentic-ids",
  "agentic deep learning": "ai-agentic-ids",
  "ai agentic dl": "ai-agentic-ids",
  "ai_agentic_dl": "ai-agentic-ids",
  "agentic": "ai-agentic-ids",
  ids: "ai-agentic-ids",
  intrusion: "ai-agentic-ids",
  cicids: "ai-agentic-ids",
  cicids2017: "ai-agentic-ids",

  "plant disease": "plant-disease-prediction",
  "plant disease prediction": "plant-disease-prediction",
  "plant disease detection": "plant-disease-prediction",
  plantvillage: "plant-disease-prediction",
  "apple leaf": "plant-disease-prediction",
  "apple leaves": "plant-disease-prediction",

  parkvision: "parkvision",
  "smart parking": "parkvision",
  parking: "parkvision",
  anpr: "parkvision",
  "number plate": "parkvision",
  license: "parkvision",

  "smart irrigation": "smart-irrigation",
  irrigation: "smart-irrigation",
  aquafield: "smart-irrigation",
  esp32: "smart-irrigation",

  securesign: "securesign",
  "secure sign": "securesign",
  rsa: "securesign",
  "digital signature": "securesign",
  "file integrity": "securesign",

  "knowledge graph": "knowledge-graph",
  "kg nlp": "knowledge-graph",
  "knowledge graph nlp": "knowledge-graph",
  triple: "knowledge-graph",
  bbc: "knowledge-graph",

  padharoogo: "padharoo-go",
  padharoo: "padharoo-go",
  "padharoo go": "padharoo-go",
  travel: "padharoo-go",

  netra: "netra",
  sonar: "netra",
  ultrasonic: "netra",
  radar: "netra",
  arduino: "netra",

  portfolio: "personal-portfolio",
  website: "personal-portfolio",
  "myportofolio": "personal-portfolio"
};

/**
 * Inspects conversation history backwards to detect the most recent project discussed.
 */
function resolveEntityFromHistory(history) {
  if (!Array.isArray(history) || !history.length) return null;
  for (let i = history.length - 1; i >= 0; i--) {
    const text = (history[i]?.text || history[i]?.content || "").toLowerCase();
    for (const [alias, id] of Object.entries(PROJECT_ALIASES)) {
      const regex = new RegExp(`\\b${alias}\\b`, "i");
      if (regex.test(text) || text.includes(alias)) {
        return id;
      }
    }
  }
  return null;
}

/**
 * Detects if the message uses anaphoric pronouns or follow-up query attributes.
 */
function hasAnaphoricReference(text) {
  const normalized = ` ${text.toLowerCase()} `;
  const markers = [
    " it ",
    " its ",
    " this project ",
    " that project ",
    " the project ",
    " this system ",
    " that system ",
    " the system ",
    " the architecture ",
    " its architecture ",
    " its limitations ",
    " its results ",
    " its datasets ",
    " datasets were used",
    " datasets used",
    " evaluation results",
    " what were the results",
    " what are the limitations",
    " what datasets",
    " the other one ",
    " other one "
  ];
  return markers.some((m) => normalized.includes(m));
}

/**
 * Formats a project object into a comprehensive structured markdown block.
 */
function formatProjectRecord(project) {
  if (!project) return "";
  return `### Project: ${project.name} (ID: ${project.id})
- **Category / Domain**: ${project.category}
- **Overview**: ${project.overview}
- **Problem Statement**: ${project.problemStatement}
- **Motivation & Objectives**: ${project.motivation} ${project.objectives}
- **Technologies Used**: ${project.technologies.join(", ")}
- **Architecture**: ${project.architecture}
- **Workflow**: ${project.workflow}
- **Algorithms & Methods**: ${project.algorithms?.join(", ") || "N/A"}
- **Models**: ${project.models?.join(", ") || "N/A"}
- **Datasets**: ${project.datasets?.join(", ") || "None / Synthesized"}
- **Preprocessing & Feature Engineering**: ${project.preprocessing || "Standard"}
- **Training & Evaluation Details**: ${project.trainingDetails || "N/A"}
- **Evaluation Metrics**: ${project.evaluationMetrics?.join(", ") || "N/A"}
- **Reported Results**: ${typeof project.results === "string" ? project.results : JSON.stringify(project.results, null, 2)}
- **Individual Contribution**: ${project.individualContribution}
- **Challenges Encountered**: ${project.challenges}
- **Known Limitations**: ${project.limitations}
- **Future Improvements**: ${project.futureImprovements}
- **Completion Status**: ${project.completionStatus}
- **Repository URL**: ${project.repositoryUrl || "Not currently specified / pending verification archive"}
${project.liveDemoUrl ? `- **Live Demo URL**: ${project.liveDemoUrl}` : ""}
${project.personalSignificance ? `- **Profile Stature**: ${project.personalSignificance}` : ""}`;
}

/**
 * Returns a complete directory of all projects with their repositories.
 */
function getAllProjectsDirectory() {
  return allProjects.map((p, idx) => {
    return `${idx + 1}. **${p.name}** [ID: ${p.id}]
   - Category: ${p.category}
   - Technologies: ${p.technologies.join(", ")}
   - Reported Metrics: ${typeof p.results === "string" ? p.results : p.results?.accuracy || p.results?.r2Score || p.results?.casiaV2?.accuracy || "Verified"}
   - Repository: ${p.repositoryUrl ? p.repositoryUrl : "Not currently specified / pending archive verification"}`;
  }).join("\n\n");
}

/**
 * Primary intelligent context retrieval function.
 */
export function retrieveContext(message, history = []) {
  const rawQuery = typeof message === "string" ? message.trim() : "";
  const normalized = rawQuery.toLowerCase();
  const tokens = normalized.split(/[^a-z0-9+#]+/).filter((t) => t.length > 1);

  const matchedProjectIds = new Set();
  
  // 1. Direct project alias matching
  for (const [alias, id] of Object.entries(PROJECT_ALIASES)) {
    const regex = new RegExp(`\\b${alias}\\b`, "i");
    if (regex.test(normalized)) {
      matchedProjectIds.add(id);
    }
  }

  // 2. Anaphoric pronoun resolution from conversation history
  const activeHistoryProjectId = resolveEntityFromHistory(history);
  const isAnaphoric = hasAnaphoricReference(normalized);
  if (isAnaphoric && activeHistoryProjectId) {
    matchedProjectIds.add(activeHistoryProjectId);
  }

  // Check for comparison intent
  const isComparison = (
    matchedProjectIds.size >= 2 ||
    normalized.includes("compare") ||
    normalized.includes("difference between") ||
    normalized.includes("versus") ||
    normalized.includes(" vs ")
  );

  // Check for global project evaluation intent or listing all projects
  const isGlobalEvaluation = (
    normalized.includes("best project") ||
    normalized.includes("strongest project") ||
    normalized.includes("favorite project") ||
    normalized.includes("most advanced") ||
    normalized.includes("most challenging") ||
    normalized.includes("rank") ||
    normalized.includes("ranking") ||
    normalized.includes("interviewer ask") ||
    normalized.includes("which project demonstrates") ||
    normalized.includes("which project is most suitable") ||
    normalized.includes("ai engineer role") ||
    normalized.includes("for an ai engineer") ||
    normalized.includes("best suited") ||
    normalized.includes("computer vision role") ||
    normalized.includes("cybersecurity role") ||
    normalized.includes("evaluation evidence") ||
    normalized.includes("reported results") ||
    (normalized.includes("strongest") && normalized.includes("project")) ||
    (normalized.includes("project") && (
      normalized.includes("list") ||
      normalized.includes("all") ||
      normalized.includes("available") ||
      normalized.includes("show me") ||
      normalized.includes("overview") ||
      normalized.includes("repository") ||
      normalized.includes("repositories")
    ))
  );

  // Check for general technical / concept questions
  const isGeneralTech = (
    normalized.startsWith("what is a ") ||
    normalized.startsWith("what is an ") ||
    normalized.startsWith("what is ") ||
    normalized.startsWith("explain ") ||
    normalized.startsWith("how does ") ||
    normalized.startsWith("difference between ") ||
    normalized.includes("what is cnn") ||
    normalized.includes("what is rag") ||
    normalized.includes("what is an ai agent") ||
    normalized.includes("what is transformer") ||
    normalized.includes("explain cnn") ||
    normalized.includes("explain transformer") ||
    normalized.includes("explain gradient descent") ||
    normalized.includes("explain reinforcement learning") ||
    normalized.includes("compare cnn and lstm") ||
    normalized.includes("what is overfitting") ||
    normalized.includes("what is rest api")
  ) && !tokens.some((t) => ["harshit", "he", "his", "portfolio", "him", "vit", "shekhawat"].includes(t));

  const sectionsToInclude = [];
  const dynamicSuggestedQuestions = [];

  // ==========================================================
  // CASE A: SPECIFIC PROJECT(S) REQUESTED
  // ==========================================================
  if (matchedProjectIds.size > 0 && !isGlobalEvaluation) {
    sectionsToInclude.push("### REQUESTED PROJECT SPECIFICATIONS (SOURCE OF TRUTH)");
    for (const id of matchedProjectIds) {
      const proj = projectsById[id];
      if (proj) {
        sectionsToInclude.push(formatProjectRecord(proj));
        if (proj.relatedQuestions?.length) {
          dynamicSuggestedQuestions.push(...proj.relatedQuestions.slice(0, 2));
        }
      }
    }

    if (isComparison && matchedProjectIds.size < 2 && activeHistoryProjectId) {
      const secondId = activeHistoryProjectId === "triforge" ? "ai-agentic-ids" : "triforge";
      const secondProj = projectsById[secondId];
      if (secondProj) {
        sectionsToInclude.push(formatProjectRecord(secondProj));
      }
    }
  }

  // ==========================================================
  // CASE B: GLOBAL PROJECT EVALUATION OR COMPLETE LISTING
  // ==========================================================
  if (isGlobalEvaluation) {
    sectionsToInclude.push("### COMPLETE PORTFOLIO PROJECT DIRECTORY WITH REPOSITORIES");
    sectionsToInclude.push(getAllProjectsDirectory());
    
    sectionsToInclude.push("### PROJECT REASONING & EVALUATION ENGINE (SOURCE OF TRUTH)");
    sectionsToInclude.push(`- **Documented Stated Opinion in Harshit's Profile**:
  1. TriForge is explicitly identified as the project that BEST REPRESENTS his advanced deep learning and computer vision capabilities.
  2. AI Agentic IDS and TriForge are explicitly identified as his TWO MOST TECHNICALLY CHALLENGING projects.
- **Chatbot Independent Evaluation Guidelines**:
  * Architectural Complexity: AI Agentic IDS (multi-agent, graph analytics, HITL retraining) and TriForge (3-stream parallel spatial-frequency-edge fusion) rank highest.
  * Verified Benchmark Rigor: TriForge (benchmarked across 4 independent datasets: CASIA v2 97.0%, 4CAM 87.1% and 0.938 ROC-AUC, CASIA v1, COVERAGE) and AI Agentic IDS (98.40% on CICIDS2017).
  * Empirical Precision: Smart Irrigation System achieved 0.99870 R² on 100K records with physical ESP32 hardware actuation.
  * Role Alignment:
    - AI Engineer / Systems: AI Agentic IDS (flagship), TriForge, Explainable Plant Disease Prediction.
    - Computer Vision: TriForge (flagship), ParkVision (396 slots ANPR), Plant Disease.
    - Cybersecurity: AI Agentic IDS (98.40% on CICIDS2017), SecureSign (RSA).
    - IoT / Hardware: Smart Irrigation (AquaField), Netra (Sonar Arduino).
    - Full-Stack: PadharooGo (Render live MVC), ParkVision (React + FastAPI).`);

    // Include full records for top two projects for rich context
    sectionsToInclude.push(formatProjectRecord(projectsById["triforge"]));
    sectionsToInclude.push(formatProjectRecord(projectsById["ai-agentic-ids"]));

    dynamicSuggestedQuestions.push(
      "Explain TriForge's 3-stream architecture.",
      "What makes AI Agentic IDS technically challenging?",
      "Which project is best suited for an AI Engineer role?"
    );
  }

  // ==========================================================
  // CASE C: PERSONAL INTRODUCTION / ABOUT ME
  // ==========================================================
  const introKeywords = ["introduce", "introduction", "who is", "about harshit", "bio", "tell me about", "journey", "background", "personality", "himself"];
  if (introKeywords.some((k) => normalized.includes(k))) {
    sectionsToInclude.push(`### Personal Introduction & Background (SOURCE OF TRUTH)
- **Full Name**: Harshit Singh Shekhawat
- **Summary**: Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning at VIT Chennai (graduating May 2027). Curious, analytical, adaptable, and experimentation-driven.
- **Why CSE & AIML**: Passionate about systems that learn from data and solve real-world problems.
- **Core Strengths**: Algorithmic problem-solving (830+ LeetCode problems solved, University Rank 4 on GeeksforGeeks with ~300 problems), deep learning, computer vision, and explainable AI.`);
  }

  // ==========================================================
  // CASE D: EDUCATION / ACADEMICS
  // ==========================================================
  const eduKeywords = ["education", "degree", "university", "college", "school", "cgpa", "gpa", "vit", "chennai", "coursework", "elective", "robotics", "graduation", "2027", "dps", "academic", "status", "study", "studying"];
  if (eduKeywords.some((k) => normalized.includes(k) || tokens.includes(k))) {
    sectionsToInclude.push(`### Academic Profile & Education (SOURCE OF TRUTH)
- **Degree**: Bachelor of Technology (B.Tech) in Computer Science and Engineering with specialization in Artificial Intelligence and Machine Learning (AIML)
- **Institution**: Vellore Institute of Technology (VIT), Chennai Campus, Tamil Nadu, India
- **Current CGPA**: 8.95 out of 10.0 (maintained throughout undergraduate studies)
- **Timeline**: Started 2023, Expected Graduation: May 2027
- **Schooling**: Delhi Public School, Jodhpur (Secondary & Senior Secondary, completed May 2023)
- **Key Coursework**: Machine Learning, Deep Learning, Artificial Intelligence, Reinforcement Learning, Computer Vision, NLP, Data Structures and Algorithms, DBMS, Probability & Statistics, Linear Algebra
- **Specialization Electives Completed**: Reinforcement Learning, Explainable Artificial Intelligence (XAI)
- **Current Coursework**: Cognitive Robotics`);
    dynamicSuggestedQuestions.push(
      "What is Harshit's current CGPA and graduation date?",
      "Which specialization electives has Harshit completed?"
    );
  }

  // ==========================================================
  // CASE E: TECHNICAL SKILLS OR TOPICS
  // ==========================================================
  const techKeywords = [
    "skill", "skills", "technical", "areas", "expertise", "strongest", "language", "languages",
    "python", "cpp", "c++", "java", "sql", "javascript", "machine learning", "ml", "deep learning",
    "dl", "cnn", "lstm", "gru", "resnet", "densenet", "transformer", "vision transformer", "vit",
    "computer vision", "cv", "image", "nlp", "bert", "explainable", "explainable ai", "xai", "shap",
    "lime", "reinforcement learning", "rl", "q-learning", "dqn", "ppo", "framework", "frameworks",
    "tools", "library", "libraries", "pytorch", "tensorflow", "keras", "scikit-learn", "opencv",
    "react", "node", "database", "learning", "currently learning", "improve"
  ];
  const matchesTech = techKeywords.some((k) => normalized.includes(k) || tokens.includes(k));

  if (matchesTech || isGeneralTech) {
    if (normalized.includes("language") || normalized.includes("python") || normalized.includes("c++") || normalized.includes("cpp")) {
      sectionsToInclude.push(`### Technical Skills: Programming Languages\n- Languages: Python (primary AI/ML), C++ (primary DSA/LeetCode 830+), C, Java, JavaScript, SQL, HTML/CSS, Shell, MATLAB, Assembly.\n- Python proficiency: End-to-end ML/DL pipelines, EDA, modeling, explainability, PyTorch, TensorFlow, Scikit-learn, OpenCV.`);
    }
    if (normalized.includes("deep learning") || normalized.includes("neural") || normalized.includes("cnn") || normalized.includes("lstm") || normalized.includes("transformer") || normalized.includes("resnet") || normalized.includes("densenet")) {
      sectionsToInclude.push(`### Technical Skills: Deep Learning Architectures\n- Architectures implemented: ANN, CNN, RNN, LSTM, GRU, ResNet, DenseNet121, Vision Transformers (ViT), Transformers, Hybrid CNN-LSTM.\n- Frameworks: TensorFlow, Keras, PyTorch.`);
    }
    if (normalized.includes("vision") || normalized.includes("image") || normalized.includes("forgery") || normalized.includes("opencv") || normalized.includes("anpr")) {
      sectionsToInclude.push(`### Technical Skills: Computer Vision\n- Domains: Image classification, forgery detection/localization, object detection, ANPR, feature representation.\n- Techniques: Spatial RGB, frequency-domain FFT, differentiable Canny edges, DenseNet121, YOLOv8, EasyOCR, Albumentations, Kornia.\n- Metrics: Accuracy, Precision, Recall, F1, IoU, ROC-AUC, MCC.`);
    }
    if (normalized.includes("nlp") || normalized.includes("text") || normalized.includes("bert") || normalized.includes("token") || normalized.includes("rag")) {
      sectionsToInclude.push(`### Technical Skills: NLP & Language Models\n- Experience: Text preprocessing, tokenization, BERT classification (98.88% on BBC dataset), semantic embeddings, triple extraction, spaCy, Neo4j, NetworkX, RAG, and AI agent workflows.`);
    }
    if (normalized.includes("explainable") || normalized.includes("xai") || normalized.includes("shap") || normalized.includes("lime") || normalized.includes("interpret")) {
      sectionsToInclude.push(`### Technical Skills: Explainable AI (XAI)\n- Techniques: SHAP (Tree/Kernel Explainer), LIME local surrogates, Feature Importance, Feature Gradients.\n- Completed specialization elective in XAI at VIT Chennai; integrated into AI Agentic IDS and Plant Disease Prediction.`);
    }
    if (normalized.includes("reinforcement") || normalized.includes("rl") || normalized.includes("q-learning") || normalized.includes("dqn") || normalized.includes("ppo")) {
      sectionsToInclude.push(`### Technical Skills: Reinforcement Learning (RL)\n- Algorithms: Multi-Armed Bandits, Epsilon-Greedy, TD(0), Q-Learning, Dyna-Q, REINFORCE, DQN, PPO, MDP formulations, Human-in-the-loop retraining.\n- Completed specialization elective in RL at VIT Chennai.`);
    }
    if (normalized.includes("learning") || normalized.includes("currently") || normalized.includes("improve") || normalized.includes("next")) {
      sectionsToInclude.push(`### Current Learning & Growth Areas\n- Currently exploring: Generative AI, Large Language Models (LLMs), Agentic AI, Retrieval-Augmented Generation (RAG), Advanced Transformer Architectures, Production AI applications, MLOps, and Cognitive Robotics.\n- Improvement targets: Production MLOps and deployment, Scalable System Design, Cloud Computing, and Software Engineering.`);
    }
    if (normalized.includes("strongest") || normalized.includes("technical areas") || normalized.includes("skills")) {
      sectionsToInclude.push(`### Strongest Technical Areas (SOURCE OF TRUTH)
- **Machine Learning (ML) & Deep Learning (DL)**: Building, training, and rigorously evaluating predictive neural models (CNN, LSTM, GRU, ResNet, DenseNet121, Transformers).
- **Computer Vision (CV)**: Image classification, image forgery detection/localization (TriForge), ANPR (ParkVision), multi-stream feature fusion (spatial RGB, FFT frequency, differentiable Canny edges).
- **Data Structures & Algorithms (DSA)**: 830+ problems solved on LeetCode across Easy, Medium, and Hard; University Rank 4 on GeeksforGeeks (~300 problems).
- **Python Development**: End-to-end data science and AI/ML workflows (TensorFlow, Keras, PyTorch, Scikit-learn, OpenCV).
- **Explainable AI (XAI)**: SHAP, LIME, and gradient-based attribution for transparent model reasoning.`);
    }
  }

  // ==========================================================
  // CASE F: CODING ACHIEVEMENTS & PROFILES
  // ==========================================================
  const achieveKeywords = ["achievement", "achievements", "leetcode", "geeksforgeeks", "gfg", "codeforces", "codechef", "codolio", "contest", "rating", "rank", "problems", "830", "certification", "certificate", "ibm"];
  if (achieveKeywords.some((k) => normalized.includes(k) || tokens.includes(k))) {
    sectionsToInclude.push(`### Coding Achievements & Profiles (SOURCE OF TRUTH)
- **LeetCode**: 830+ problems solved across Easy, Medium, and Hard tiers. Participated in 3 contests. Profile: https://leetcode.com/u/harshit_shekhawat/ (Treat 830+ as last reported milestone; live stats on profile).
- **GeeksforGeeks**: University Rank 4 at VIT Chennai with ~300 problems solved. Profile: https://www.geeksforgeeks.org/profile/surfe6mip
- **Codeforces**: 1 contest participated in. Profile: https://codeforces.com/profile/harshitshekhawat501?utm=codolio
- **CodeChef**: Profile: https://www.codechef.com/users/surfer_w96?utm=codolio
- **Codolio**: Primary unified portfolio: https://codolio.com/profile/surferw96
- **Certifications**: IBM Generative AI Certification (verified).
- **Rule**: Do not invent ratings, badges, hackathons, or unverified claims.`);
    dynamicSuggestedQuestions.push(
      "How many LeetCode problems has Harshit solved?",
      "Where can I find his competitive programming profiles?"
    );
  }

  // ==========================================================
  // CASE G: CAREER GOALS & ROLES
  // ==========================================================
  const careerKeywords = ["career", "job", "role", "roles", "hire", "recruiter", "interview", "internship", "opportunity", "future", "goals", "startup", "availability", "industry"];
  if (careerKeywords.some((k) => normalized.includes(k) || tokens.includes(k))) {
    sectionsToInclude.push(`### Career Goals & Professional Interests (SOURCE OF TRUTH)
- **Primary Roles**: AI Engineer, Machine Learning Engineer, Deep Learning Engineer, Computer Vision Engineer, Applied AI Engineer, AI R&D.
- **Target Industries**: AI/ML, Cybersecurity, Healthcare Tech, AgriTech, Computer Vision & Forensics, Intelligent Automation, AI SaaS.
- **Philosophy**: Enjoys combining research-oriented experimentation with practical product engineering.
- **Graduation & Availability**: Expected B.Tech graduation May 2027. Open to relevant internships, engineering roles, and technical collaborations.`);
    dynamicSuggestedQuestions.push(
      "What roles is Harshit interested in?",
      "When does he graduate and what is his availability?"
    );
  }

  // ==========================================================
  // CASE H: WORKING STYLE & PHILOSOPHY
  // ==========================================================
  const styleKeywords = ["working style", "philosophy", "debug", "debugging", "approach", "problem solving", "team", "independent", "code quality", "documentation", "how do you learn", "how does he learn"];
  if (styleKeywords.some((k) => normalized.includes(k) || tokens.includes(k))) {
    sectionsToInclude.push(`### Engineering Philosophy & Working Style (SOURCE OF TRUTH)
- **Core Motto**: Understand deeply. Build thoughtfully. Improve continuously.
- **First Principles**: Understand underlying concepts, mathematics, advantages, and limitations before writing code.
- **Debugging**: Systematic hypothesis testing (reproduce -> isolate -> inspect intermediate tensors/logs -> test hypotheses -> fix root cause -> verify non-regression).
- **Model Selection**: Based on empirical evidence (accuracy, compute, scalability, interpretability, constraints) rather than popularity.
- **Collaboration**: Comfortable working independently or with teams (served as General Secretary of Mharo Rajasthan Club).
- **Lesson Learned**: Achieving strong performance on one dataset does not mean real-world generalization; cross-dataset evaluation and explainability are vital.`);
  }

  // ==========================================================
  // CASE I: CONTACT & PROFILES
  // ==========================================================
  const contactKeywords = ["contact", "email", "reach", "hire", "linkedin", "github", "profile", "connect", "message", "write"];
  if (contactKeywords.some((k) => normalized.includes(k) || tokens.includes(k))) {
    sectionsToInclude.push(`### Contact & External Profiles (SOURCE OF TRUTH)
- **Professional Email**: harshitshekhawat501@gmail.com (mailto:harshitshekhawat501@gmail.com)
- **LinkedIn**: https://www.linkedin.com/in/harshitshekhawat/
- **GitHub**: https://github.com/Lawapaul
- **LeetCode**: https://leetcode.com/u/harshit_shekhawat/
- **GeeksforGeeks**: https://www.geeksforgeeks.org/profile/surfe6mip
- **Codeforces**: https://codeforces.com/profile/harshitshekhawat501?utm=codolio
- **Preferred Channels**: Email for job opportunities/recruitment; LinkedIn for professional networking.
- **Privacy Rules**: Never invent or disclose phone numbers, home address, passwords, or institutional IDs.`);
    dynamicSuggestedQuestions.push(
      "How can a recruiter contact Harshit?",
      "What is Harshit's LinkedIn and GitHub profile?"
    );
  }

  // ==========================================================
  // CASE J: PERSONAL / HOBBIES / LEADERSHIP
  // ==========================================================
  const personalKeywords = ["outside", "hobby", "hobbies", "personal", "club", "general secretary", "mharo", "rajasthan", "languages", "discussion", "teammates"];
  if (personalKeywords.some((k) => normalized.includes(k) || tokens.includes(k))) {
    sectionsToInclude.push(`### Personal Interests & Leadership (SOURCE OF TRUTH)
- **Leadership**: General Secretary of the Mharo Rajasthan Club at VIT Chennai (teamwork, event coordination, organizational leadership).
- **Outside Academics**: Competitive programming, exploring AI developments, improving communication, learning languages, creative technology ideas.
- **Topics of Interest**: AI, Computer Vision, startups, technology trends, problem solving, software engineering.`);
  }

  // Fallback: If nothing matched specifically, provide high-level overview + FAQ
  if (sectionsToInclude.length === 0) {
    sectionsToInclude.push(`### Harshit Singh Shekhawat — Profile Overview (SOURCE OF TRUTH)
- **Identity**: B.Tech CSE (AIML) student at VIT Chennai (CGPA 8.95/10, graduating May 2027).
- **Primary Interests**: Deep Learning, Computer Vision, Explainable AI (XAI), AI Agents, Cybersecurity, and Intelligent Systems.
- **Key Milestones**: 830+ LeetCode problems solved, University Rank 4 on GeeksforGeeks (~300 problems), IBM Generative AI Certification.
- **Flagship Projects**: TriForge (3-stream image forgery detection & localization tested on 4 datasets), AI Agentic IDS (98.40% accuracy on CICIDS2017 with XAI and graph analytics), Explainable Plant Disease Detection, ParkVision, Smart Irrigation (0.99870 R² on 100K records).
- **Contact**: harshitshekhawat501@gmail.com | LinkedIn: https://www.linkedin.com/in/harshitshekhawat/ | GitHub: https://github.com/Lawapaul`);
    
    dynamicSuggestedQuestions.push(
      "Tell me about Harshit.",
      "What is Harshit's best project?",
      "What are his strongest technical skills?"
    );
  }

  // Deduplicate suggested questions
  const uniqueSuggestions = Array.from(new Set(dynamicSuggestedQuestions)).slice(0, 3);

  return {
    contextText: sectionsToInclude.join("\n\n"),
    isGeneralTech,
    isComparison,
    isGlobalEvaluation,
    matchedProjectIds: Array.from(matchedProjectIds),
    suggestedQuestions: uniqueSuggestions.length ? uniqueSuggestions : [
      "What is Harshit's strongest project?",
      "Explain the architecture of TriForge.",
      "How can a recruiter contact Harshit?"
    ]
  };
}
