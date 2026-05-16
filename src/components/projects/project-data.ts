export type ProjectAccent = "primary" | "cyber-teal" | "neon-green" | "destructive";

export type ProjectItem = {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: [string, string, string];
  techStack: string[];
  github: string;
  demo?: string;
  accent: ProjectAccent;
  featured?: boolean;
};

export const projectItems: ProjectItem[] = [
  {
    category: "AI Security",
    title: "AI Agentic IDS",
    subtitle: "Explainable Multi-Agent Intrusion Detection and Response Pipeline",
    description:
      "Full-stack intrusion detection platform for CICIDS2017 traffic using deep learning, graph analytics, memory retrieval, and LLM-guided response workflows.",
    highlights: [
      "98.40% IDS accuracy with ResNet",
      "LIME explainability with graph analytics",
      "Human-in-the-loop RL retraining pipeline",
    ],
    techStack: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "FastAPI", "SQLite", "Hugging Face", "NetworkX"],
    github: "https://github.com/Lawapaul/AI_Agentic_DL",
    accent: "primary",
    featured: true,
  },
  {
    category: "Computer Vision",
    title: "Smart Parking System",
    subtitle: "AI-Powered Parking Guidance and ANPR Platform",
    description:
      "Real-time parking operations platform that tracks occupancy, recognizes plates, and recommends the best available slot through a live dashboard.",
    highlights: [
      "396 parking slots monitored in real time",
      "YOLOv8 and EasyOCR ANPR pipeline",
      "FastAPI and React live dashboard",
    ],
    techStack: ["Python", "OpenCV", "YOLOv8", "EasyOCR", "FastAPI", "SQLite", "SQLAlchemy", "React"],
    github: "https://github.com/Lawapaul/Smart-Parking-Guidance-and-Number-Plate-Recognition-System",
    accent: "cyber-teal",
    featured: true,
  },
  {
    category: "AI + IoT",
    title: "Smart Irrigation System",
    subtitle: "ML-Powered Crop Water Prediction and ESP32 Automation",
    description:
      "Sensor-driven irrigation platform that predicts crop water demand and safely automates motor control using real-time ESP32 telemetry.",
    highlights: [
      "0.99870 R² across 100K records",
      "Live ESP32 telemetry and motor automation",
      "Rain-aware safety cutoffs with flow checks",
    ],
    techStack: ["Python", "Flask", "scikit-learn", "XGBoost", "LightGBM", "ESP32", "Arduino", "JavaScript"],
    github: "https://github.com/Lawapaul/Smart-Irrigation-System",
    accent: "neon-green",
  },
  {
    category: "NLP + Knowledge Graphs",
    title: "Knowledge Graph NLP Suite",
    subtitle: "Explainable NLP Benchmarking and Knowledge Graph Generation",
    description:
      "NLP benchmarking and graph generation suite focused on explainable text classification, triple extraction, and source-aware visualization workflows.",
    highlights: [
      "98.88% accuracy on the BBC dataset",
      "Source-aware knowledge graph extraction",
      "Benchmarked models across multiple datasets",
    ],
    techStack: ["Python", "scikit-learn", "TensorFlow", "Transformers", "spaCy", "Neo4j", "NetworkX"],
    github: "https://github.com/Lawapaul/Knowledge_Graph_using_enhanced_NLP",
    accent: "primary",
  },
  {
    category: "Full Stack",
    title: "PadharooGo",
    subtitle: "Travel Stays and Booking Platform",
    description:
      "Production-style accommodation platform with listings, authentication, media handling, reviews, and map-based stay discovery.",
    highlights: [
      "MVC full-stack architecture with MongoDB",
      "Cloudinary and Mapbox integrations",
      "Secure auth with persistent sessions",
    ],
    techStack: ["Node.js", "Express.js", "MongoDB", "EJS", "Passport.js", "Cloudinary", "Mapbox"],
    github: "https://github.com/Lawapaul/PadharooGo-Full-stack-end-to-end-platform-for-travel-stays",
    demo: "https://padharoogo-full-stack-end-to-end.onrender.com/listings",
    accent: "destructive",
  },
  {
    category: "Cyber Security",
    title: "SecureSign",
    subtitle: "RSA-Based Digital Signature and File Integrity Verification System",
    description:
      "Cryptography-focused application for secure document signing and file integrity checks using practical RSA-based verification workflows.",
    highlights: [
      "RSA-based digital signature workflow",
      "File integrity verification pipeline",
      "Applied practical cryptography concepts",
    ],
    techStack: ["Python", "Cryptography", "RSA", "File Hashing", "Security Systems"],
    github: "https://github.com/Lawapaul/SecureSign-RSA-Based-Digital-Signature-and-File-Integrity-Verification-System",
    accent: "cyber-teal",
  },
  {
    category: "Embedded Systems",
    title: "Netra",
    subtitle: "Real-Time Sonar Mapping System Using Arduino",
    description:
      "Sonar-style obstacle mapping system that combines ultrasonic sensing, servo scanning, and live radar visualization for spatial awareness.",
    highlights: [
      "Real-time 180 degree obstacle mapping",
      "Arduino and ultrasonic sensor integration",
      "Radar-style live visualization interface",
    ],
    techStack: ["Arduino Uno", "Embedded C", "Processing 3", "HC-SR04", "Servo Motor"],
    github: "https://github.com/Lawapaul/Netra---Sonar-Mapping-System",
    accent: "neon-green",
  },
];
