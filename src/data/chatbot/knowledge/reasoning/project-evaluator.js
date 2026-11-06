import { allProjects, projectsById } from "../projects/index.js";

/**
 * Structured project evaluation framework for Harshit's portfolio.
 * Encapsulates both documented personal opinions and independent multi-criteria technical rankings.
 */
export const projectEvaluationFramework = {
  // Documented personal opinions from Harshit's profile
  documentedPersonalOpinion: {
    bestRepresentativeProject: "triforge",
    statement: "TriForge — Image Forgery Detection and Localization — is explicitly identified by Harshit as the project that best represents his advanced deep learning and computer vision capabilities.",
    mostTechnicallyChallengingProjects: ["ai-agentic-ids", "triforge"],
    challengingStatement: "Harshit explicitly identifies AI Agentic IDS and TriForge as his two most technically challenging projects."
  },

  // Multi-criteria evaluation dimensions for every project
  criteria: [
    "Architectural Sophistication (multi-stream, multi-agent, cyber-physical)",
    "Technical Innovation (multi-modal fusion, explainability, graph modeling)",
    "Model Diversity & Complexity (deep networks, transformers, ensembles)",
    "Dataset Rigor & Verification (cross-dataset testing, large-scale benchmarks)",
    "Verified Performance Metrics (accuracy, ROC-AUC, R², MCC)",
    "Engineering Breadth & Individual Ownership"
  ],

  // Structured comparative matrix
  comparisonMatrix: [
    {
      id: "triforge",
      name: "TriForge",
      domain: "Computer Vision & Digital Forensics",
      architecturalComplexity: "Very High (3-stream parallel architecture fusing spatial RGB, FFT frequency domain, and differentiable Canny edge gradients)",
      technicalInnovation: "Multi-domain forensic cue fusion bridging spectral anomalies with spatial semantics",
      verifiedMetrics: "CASIA v2: 97.0% Accuracy, 96.3% F1; 4CAM: 87.1% Accuracy, 0.938 ROC-AUC, 0.747 MCC; CASIA v1: 64.7% Acc; COVERAGE: 53.0% Acc",
      datasetRigor: "High — Tested across 4 distinct external benchmark datasets evaluating cross-dataset generalization",
      suitabilityRoles: ["Computer Vision Engineer", "Deep Learning Engineer", "AI Forensic Researcher"],
      interviewerHighlight: "Ask about the Fast Fourier Transform (FFT) and differentiable Canny streams, why frequency features expose manipulations that RGB misses, and how he analyzed cross-dataset generalization drops on COVERAGE and CASIA v1."
    },
    {
      id: "ai-agentic-ids",
      name: "AI Agentic IDS",
      domain: "Cybersecurity & Explainable AI",
      architecturalComplexity: "Very High (Multi-agent full-stack pipeline with 6+ neural architectures, graph analytics, and HITL retraining)",
      technicalInnovation: "Explainable deep learning (SHAP + LIME) combined with NetworkX graph topology and human-in-the-loop RL feedback",
      verifiedMetrics: "98.40% IDS accuracy with ResNet on CICIDS2017 network traffic",
      datasetRigor: "Very High — Evaluated on multi-million record CICIDS2017 benchmark with extreme class imbalance",
      suitabilityRoles: ["AI Engineer", "Cybersecurity AI Specialist", "Machine Learning Systems Engineer"],
      interviewerHighlight: "Ask about how SHAP/LIME feature attributions are computed efficiently on network flows, how NetworkX models lateral attack spread, and how the human-in-the-loop retraining pipeline updates model weights."
    },
    {
      id: "plant-disease-prediction",
      name: "Explainable Plant Disease Detection",
      domain: "Computer Vision, AgriTech & XAI",
      architecturalComplexity: "High (Deep CNN classification paired with visual attribution maps, RAG knowledge indexing, and LLM advice synthesis)",
      technicalInnovation: "Bridging vision diagnostics with RAG agronomic context and continuous human feedback memory",
      verifiedMetrics: "Curated 7,771 images from PlantVillage across 4 apple leaf categories",
      datasetRigor: "Moderate to High — 7,771 benchmark images across distinct disease phenotypes",
      suitabilityRoles: ["Applied AI Engineer", "Computer Vision Engineer", "AgriTech AI Developer"],
      interviewerHighlight: "Ask about how the RAG pipeline grounds LLM agronomic advice using leaf attribution maps, and how false diagnoses are corrected via human-in-the-loop memory."
    },
    {
      id: "smart-irrigation",
      name: "Smart Irrigation System (AquaField)",
      domain: "AI + IoT & Cyber-Physical Systems",
      architecturalComplexity: "High (Cyber-physical system with ML regression ensemble and ESP32 physical valve actuation)",
      technicalInnovation: "Closed-loop IoT automation coupling gradient boosted regression with failsafe state-machine hardware cutoffs",
      verifiedMetrics: "0.99870 R² score across 100,000 agricultural telemetry records",
      datasetRigor: "High — 100,000 real/simulated telemetry records covering diverse environmental regimes",
      suitabilityRoles: ["AI + IoT Engineer", "Machine Learning Engineer", "Embedded Systems Engineer"],
      interviewerHighlight: "Ask about achieving 0.99870 R² on 100K records, how sensor noise is filtered, and how the physical pump dry-run and rain-aware safety interlocks operate."
    },
    {
      id: "parkvision",
      name: "ParkVision",
      domain: "Computer Vision & Smart Cities",
      architecturalComplexity: "Moderate to High (Real-time video inference, multi-slot ROI tracking, and dual YOLOv8 + EasyOCR pipeline)",
      technicalInnovation: "Real-time edge ANPR pipeline with polygon intersection tracking across 396 bays",
      verifiedMetrics: "396 parking slots monitored in real time, full FastAPI + React live dashboard",
      datasetRigor: "Moderate — Real parking video streams and annotated ROI polygons",
      suitabilityRoles: ["Computer Vision Engineer", "Full-Stack AI Developer"],
      interviewerHighlight: "Ask about managing vehicle occlusion across 396 slots and optimizing the YOLOv8 and EasyOCR pipeline for real-time video FPS."
    },
    {
      id: "knowledge-graph",
      name: "Knowledge Graph NLP Suite",
      domain: "NLP & Knowledge Engineering",
      architecturalComplexity: "Moderate to High (Multi-model NLP benchmarking, dependency tree triple extraction, Neo4j/NetworkX graph mapping)",
      technicalInnovation: "Source-aware knowledge extraction and explainable linguistic classification",
      verifiedMetrics: "98.88% classification accuracy on the BBC News dataset",
      datasetRigor: "Moderate to High — Standard multi-class BBC News benchmark",
      suitabilityRoles: ["NLP Engineer", "Knowledge Graph Specialist"],
      interviewerHighlight: "Ask about dependency parsing algorithms for subject-predicate-object triple extraction and benchmarking classical vs Transformer NLP models."
    },
    {
      id: "padharoo-go",
      name: "PadharooGo",
      domain: "Full-Stack Web Engineering",
      architecturalComplexity: "Moderate (Production MVC architecture with Mapbox geospatial integration, Cloudinary, and Passport.js)",
      technicalInnovation: "Complete end-to-end booking platform with map discovery, reviews, and secure sessions",
      verifiedMetrics: "Full MVC full-stack deployment on Render with persistent MongoDB",
      datasetRigor: "N/A (Web engineering application)",
      suitabilityRoles: ["Full-Stack Developer", "Backend Engineer (Node.js/Express)"],
      interviewerHighlight: "Ask about implementing the MVC pattern in Express, session-based authentication security, and Mapbox geospatial query integration."
    },
    {
      id: "securesign",
      name: "SecureSign",
      domain: "Applied Cryptography & Cybersecurity",
      architecturalComplexity: "Moderate (RSA key pair generation, SHA-256 chunked hashing, digital signature generation and verification)",
      technicalInnovation: "Practical, mathematically verified document signing and instant tamper detection",
      verifiedMetrics: "100% bit-level tamper detection guarantee",
      datasetRigor: "N/A (Deterministic cryptographic algorithms)",
      suitabilityRoles: ["Cybersecurity Engineer", "Backend Security Developer"],
      interviewerHighlight: "Ask about RSA mathematical mechanics, modular exponentiation, and securing cryptographic keys against file system exposure."
    },
    {
      id: "netra",
      name: "Netra",
      domain: "Embedded Systems & Hardware-Software Co-Design",
      architecturalComplexity: "Moderate (Embedded C microcontroller firmware, UART serial framing, and Processing 3 polar radar visualization)",
      technicalInnovation: "Cost-effective 180-degree real-time spatial sonar mapping without expensive LiDAR",
      verifiedMetrics: "180-degree obstacle detection within ±1-2 cm accuracy",
      datasetRigor: "N/A (Physical embedded system)",
      suitabilityRoles: ["Embedded Systems Engineer", "Robotics Perception Developer"],
      interviewerHighlight: "Ask about non-blocking servo timing, serial baud synchronization, and translating polar sonar coordinates to screen coordinates in Processing 3."
    }
  ],

  // Role recommendations
  roleSuitabilityMap: {
    "AI Engineer": {
      recommended: ["ai-agentic-ids", "triforge", "plant-disease-prediction"],
      reasoning: "AI Agentic IDS showcases full-stack AI engineering: end-to-end deep learning, explainability (SHAP/LIME), graph modeling, and adaptive human-in-the-loop retraining on large-scale data."
    },
    "Computer Vision Engineer": {
      recommended: ["triforge", "parkvision", "plant-disease-prediction"],
      reasoning: "TriForge demonstrates advanced multi-stream vision architectures (spatial RGB, FFT frequency, differentiable Canny edges), while ParkVision demonstrates practical real-time detection (YOLOv8) and ANPR (EasyOCR) over 396 slots."
    },
    "Cybersecurity / Threat Intelligence": {
      recommended: ["ai-agentic-ids", "securesign"],
      reasoning: "AI Agentic IDS proves deep learning threat detection at 98.40% accuracy on CICIDS2017 with graph lateral spread analysis, complemented by SecureSign's foundational RSA cryptography."
    },
    "Machine Learning / Data Science": {
      recommended: ["smart-irrigation", "ai-agentic-ids", "knowledge-graph"],
      reasoning: "Smart Irrigation demonstrates rigorous predictive regression (0.99870 R² over 100K records) and AquaField closed-loop automation, while Knowledge Graph demonstrates 98.88% NLP accuracy on BBC News."
    },
    "Full-Stack Web Engineering": {
      recommended: ["padharoo-go", "parkvision", "personal-portfolio"],
      reasoning: "PadharooGo illustrates production MVC web architecture with Express, MongoDB, Mapbox, and Cloudinary, complemented by ParkVision's FastAPI + React stack and the portfolio's modern React/Three.js architecture."
    },
    "Embedded Systems / Robotics": {
      recommended: ["smart-irrigation", "netra"],
      reasoning: "Netra shows Arduino microcontrollers and real-time ultrasonic radar mapping, while Smart Irrigation demonstrates ESP32 IoT telemetry and relay motor automation."
    }
  },

  // Ranking by technical complexity
  complexityRanking: [
    { rank: 1, id: "ai-agentic-ids", title: "AI Agentic IDS", justification: "Multi-agent deep learning pipeline with 6+ neural architectures, SHAP/LIME explainability, graph topology analysis, and human-in-the-loop RL retraining on millions of CICIDS2017 network flows." },
    { rank: 2, id: "triforge", title: "TriForge", justification: "Multi-stream deep learning fusing spatial, Fast Fourier Transform (FFT) frequency spectrum, and differentiable Canny edge gradients, evaluated across 4 benchmark datasets." },
    { rank: 3, id: "plant-disease-prediction", title: "Explainable Plant Disease Detection", justification: "Couples deep convolutional classification of 7,771 images with visual attribution maps, RAG knowledge indexing, and human feedback memory." },
    { rank: 4, id: "smart-irrigation", title: "Smart Irrigation System (AquaField)", justification: "Cyber-physical system achieving 0.99870 R² on 100K records with ESP32 real-time telemetry and failsafe motor control." },
    { rank: 5, id: "parkvision", title: "ParkVision", justification: "Real-time edge ANPR pipeline utilizing YOLOv8 and EasyOCR across 396 monitored parking bays with live dashboard streaming." },
    { rank: 6, id: "knowledge-graph", title: "Knowledge Graph NLP Suite", justification: "Multi-architecture NLP benchmarking (98.88% accuracy on BBC News), dependency tree triple extraction, and Neo4j graph construction." },
    { rank: 7, id: "padharoo-go", title: "PadharooGo", justification: "Full-stack MVC application with Passport.js authentication, Cloudinary media handling, Mapbox geolocation, and MongoDB." },
    { rank: 8, id: "securesign", title: "SecureSign", justification: "Asymmetric RSA key pair management, SHA-256 chunked hashing, digital signing, and bit-level file integrity verification." },
    { rank: 9, id: "netra", title: "Netra", justification: "Arduino Uno embedded C firmware, 180° servo sweep, HC-SR04 ultrasonic time-of-flight calculation, and Processing 3 radar rendering." },
    { rank: 10, id: "personal-portfolio", title: "Personal Portfolio", justification: "React 18 SPA with Three.js 3D mascot rendering, Tailwind styling, and Netlify Functions server-side OpenRouter free-model inference." }
  ]
};

/**
 * Returns a comparative evaluation of projects tailored to a specific question or role.
 */
export function getComparativeEvaluation(query) {
  const q = (query || "").toLowerCase();
  
  if (q.includes("computer vision") || q.includes("vision")) {
    return {
      category: "Computer Vision",
      primary: projectsById["triforge"],
      secondary: projectsById["parkvision"],
      tertiary: projectsById["plant-disease-prediction"],
      summary: "For Computer Vision, TriForge is the foremost project because it invents a novel 3-stream fusion (spatial RGB, FFT frequency, differentiable Canny edges) evaluated on 4 datasets. ParkVision complements it with real-time YOLOv8 object detection and EasyOCR across 396 bays."
    };
  }

  if (q.includes("cybersecurity") || q.includes("security") || q.includes("ids") || q.includes("intrusion")) {
    return {
      category: "Cybersecurity",
      primary: projectsById["ai-agentic-ids"],
      secondary: projectsById["securesign"],
      summary: "For Cybersecurity, AI Agentic IDS is the flagship project (achieving 98.40% accuracy on CICIDS2017 with SHAP/LIME explainability and graph analytics). SecureSign provides applied cryptographic security via RSA digital signatures."
    };
  }

  if (q.includes("interviewer") || q.includes("interview")) {
    return {
      category: "Interview Focus",
      primary: projectsById["triforge"],
      secondary: projectsById["ai-agentic-ids"],
      summary: "Interviewers should primarily focus on TriForge (multi-stream deep learning, FFT frequency analysis, cross-dataset failure modes) and AI Agentic IDS (large-scale CICIDS2017 deep learning, SHAP/LIME latency trade-offs, and human-in-the-loop retraining)."
    };
  }

  // Default / "best project" query:
  return {
    category: "Best Overall Project",
    personalDocumentedBest: projectsById["triforge"],
    personalDocumentedChallenging: [projectsById["ai-agentic-ids"], projectsById["triforge"]],
    aiEvaluationBest: projectsById["triforge"],
    aiCloseRunnerUp: projectsById["ai-agentic-ids"],
    summary: "By personal documented opinion, TriForge best represents Harshit's advanced deep learning and computer vision capabilities, while AI Agentic IDS and TriForge are his two most technically challenging projects. From an independent engineering standpoint, TriForge stands out for multi-domain feature fusion and 4-dataset forensic benchmarking, while AI Agentic IDS stands out for multi-agent systems complexity (98.40% accuracy, XAI, graph analytics)."
  };
}

