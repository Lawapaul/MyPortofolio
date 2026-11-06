export interface MascotCentralConfig {
  /**
   * Replace `glbModelPath` with a string path (e.g., "/models/harshit-mascot.glb")
   * when the personalized GLB/glTF asset is ready. While null, the procedural
   * stylized 3D engineer character is rendered automatically.
   */
  glbModelPath: string | null;
  scale: number;
  position: [number, number, number];
  camera: {
    position: [number, number, number];
    fov: number;
  };
  lighting: {
    ambientIntensity: number;
    keyLightColor: string;
    keyLightIntensity: number;
    rimLightColor: string;
    rimLightIntensity: number;
    fillLightColor: string;
    fillLightIntensity: number;
  };
  animation: {
    idleFloatSpeed: number;
    idleFloatAmplitude: number;
    pointerSensitivityX: number;
    pointerSensitivityY: number;
    smoothingDamping: number;
  };
  materials: {
    suitColor: string;
    innerShirtColor: string;
    glassesFrameColor: string;
    glassesLensColor: string;
    hairColor: string;
    skinToneColor: string;
    accentGlowColor: string;
  };
}

export const MASCOT_CONFIG: MascotCentralConfig = {
  glbModelPath: null, // Drop-in GLB path when available, e.g., "/models/harshit-mascot.glb"
  scale: 1.05,
  position: [0, -0.55, 0],
  camera: {
    position: [0, 0.25, 4.4],
    fov: 38,
  },
  lighting: {
    ambientIntensity: 0.72,
    keyLightColor: "#F5F3F0",
    keyLightIntensity: 1.85,
    rimLightColor: "#E86A33",
    rimLightIntensity: 2.4,
    fillLightColor: "#F29A4A",
    fillLightIntensity: 1.15,
  },
  animation: {
    idleFloatSpeed: 1.35,
    idleFloatAmplitude: 0.06,
    pointerSensitivityX: 0.28,
    pointerSensitivityY: 0.18,
    smoothingDamping: 4.5,
  },
  materials: {
    suitColor: "#1C1B1A",
    innerShirtColor: "#141518",
    glassesFrameColor: "#C8C2BC",
    glassesLensColor: "#E86A33",
    hairColor: "#18181B",
    skinToneColor: "#D8B49C",
    accentGlowColor: "#E86A33",
  },
};

export const BRAND_ASSETS = {
  /**
   * Approved personal portrait and original 3D mascot artwork assets.
   */
  logoImageUrl: "/images/harshit-profile.png" as string | null,
  profilePhotoUrl: "/images/harshit-profile.png" as string | null,
  mascotPhotoUrl: "/images/harshit-mascot.jpg",
  monogram: "HSS",
  placeholderNotice: "Verified personal portrait & original 3D mascot showcase",
};

export const RESUME_CONFIG = {
  viewUrl: "https://drive.google.com/file/d/18JsHZDh9sBw4OxPocXzHvFMIrTFtFmSN/view?usp=sharing",
  filePath: "/resume.pdf",
  downloadFileName: "Harshit_Singh_Shekhawat_Resume.pdf",
};

export interface NavItem {
  label: string;
  navLabel: string;
  path: string;
  index: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: "Home", navLabel: "Home", path: "/", index: "01" },
  { label: "About", navLabel: "About", path: "/about", index: "02" },
  { label: "Projects", navLabel: "Projects", path: "/projects", index: "03" },
  { label: "Technical Expertise", navLabel: "Expertise", path: "/expertise", index: "04" },
  { label: "Profiles & Achievements", navLabel: "Profiles", path: "/profiles", index: "05" },
  { label: "Education", navLabel: "Education", path: "/education", index: "06" },
  { label: "Contact", navLabel: "Contact", path: "/contact", index: "07" },
];

export const HOME_DATA = {
  smallLabel: "INTRODUCTION / 01",
  name: "Harshit Singh Shekhawat",
  professionalTitle: "AI / ML ENGINEER",
  mainHeadline: "Engineering intelligence. Building what comes next.",
  exactIntroduction:
    "I'm a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning at VIT Chennai. I enjoy building intelligent systems that combine machine learning, deep learning, and strong software engineering fundamentals to solve practical problems.",
  supportingStatement:
    "From computer vision and explainable AI to intelligent agents and scalable applications, I explore how technology can move beyond theory into useful real-world systems.",
  technologyLabels: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Software Engineering",
  ],
  buttons: {
    primary: {
      label: "Explore My Work",
      path: "/projects",
    },
    secondary: {
      label: "Know More About Me",
      path: "/about",
    },
  },
};

export const ABOUT_DATA = {
  smallLabel: "ABOUT / 02",
  heading: "More than just code.",
  paragraphs: [
    "I'm Harshit Singh Shekhawat, a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning at VIT Chennai.",
    "My interests lie at the intersection of artificial intelligence, machine learning, deep learning, and software engineering. I enjoy understanding how things work beneath the surface and turning that understanding into practical solutions.",
    "I believe good engineering is not just about making something work. It's about understanding the problem, choosing the right approach, and building something reliable, useful, and maintainable.",
  ],
  academicSnapshot: {
    university: "VIT Chennai",
    degree: "B.Tech",
    branch: "Computer Science & Engineering",
    specialization: "Artificial Intelligence & Machine Learning",
    cgpa: "8.95",
  },
  areasOfInterest: [
    {
      title: "Artificial Intelligence & Machine Learning",
      code: "DOMAIN // 01",
      focus: "Foundational statistical learning, representation learning, and predictive modelling.",
      connections: ["Deep Learning and Computer Vision", "Explainable AI"],
    },
    {
      title: "Deep Learning and Computer Vision",
      code: "DOMAIN // 02",
      focus: "Neural architectures for visual recognition, localization, forensics, and spatial perception.",
      connections: ["Artificial Intelligence & Machine Learning", "Explainable AI"],
    },
    {
      title: "Explainable AI",
      code: "DOMAIN // 03",
      focus: "Interpretable decision pipelines, attribution visualization, and transparent model reasoning.",
      connections: ["Intelligent Systems and AI Agents", "Deep Learning and Computer Vision"],
    },
    {
      title: "Intelligent Systems and AI Agents",
      code: "DOMAIN // 04",
      focus: "Retrieval-augmented workflows, autonomous reasoning loops, and human-in-the-loop feedback.",
      connections: ["Explainable AI", "Software Engineering"],
    },
    {
      title: "Data Structures & Algorithms",
      code: "DOMAIN // 05",
      focus: "Algorithmic problem-solving, graph structures, complexity optimization, and systems efficiency.",
      connections: ["Software Engineering", "Artificial Intelligence & Machine Learning"],
    },
    {
      title: "Software Engineering",
      code: "DOMAIN // 06",
      focus: "Reliable full-stack architectures, clean APIs, maintainable codebases, and end-to-end delivery.",
      connections: ["Data Structures & Algorithms", "Intelligent Systems and AI Agents"],
    },
  ],
  engineeringPhilosophy: {
    heading: "Understand deeply. Build thoughtfully. Improve continuously.",
    text: "I like working on problems that require more than simply applying an existing solution. I value experimentation, understanding the fundamentals, and continuously improving the way a system works.",
  },
};

export type ProjectVisualTheme =
  | "forensic-prism"
  | "botanical-xai"
  | "neural-shield"
  | "vision-grid"
  | "telemetry-wave"
  | "knowledge-constellation"
  | "geospatial-atlas"
  | "cipher-lattice"
  | "sonar-sweep";

export interface PortfolioProject {
  number: string;
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  description: string[];
  technologies: string[];
  githubUrl: string | null;
  liveDemoUrl?: string;
  visualTheme: ProjectVisualTheme;
  accentHex: string;
  secondaryHex: string;
}

export const PROJECTS_DATA = {
  smallLabel: "SELECTED WORK / 03",
  heading: "Ideas into working systems.",
  introduction:
    "A collection of projects exploring artificial intelligence, machine learning, computer vision, cybersecurity, software engineering, and embedded systems.",
  projects: [
    {
      number: "01",
      id: "triforge",
      category: "Computer Vision",
      title: "TriForge — Image Forgery Detection and Localization",
      subtitle: "Deep-Learning Image Forensics & Manipulation Localization Framework",
      description: [
        "TriForge is a deep-learning-based image forgery detection and localization framework designed to identify manipulated images and highlight potentially forged regions. It explores image authenticity through complementary visual information to support more reliable forgery analysis.",
      ],
      technologies: ["Deep Learning", "Computer Vision", "Image Forensics"],
      githubUrl: "https://github.com/Lawapaul/TRIFORGE-AUTOMATED-IMAGE-FORGERY-DETECTION-AND-LOCALIZATION-",
      visualTheme: "forensic-prism",
      accentHex: "#E86A33",
      secondaryHex: "#F29A4A",
    },
    {
      number: "02",
      id: "explainable-plant-disease",
      category: "AI / ML",
      title: "Explainable Plant Disease Detection Using Deep Learning",
      subtitle: "Explainable Vision, RAG Interpretation & Human-in-the-Loop Feedback",
      description: [
        "Developed a deep learning pipeline to classify four apple leaf categories—Healthy, Scab, Black Rot, and Cedar Apple Rust—using 7,771 images from the PlantVillage dataset.",
        "Integrated explainable AI techniques with a Retrieval-Augmented Generation (RAG) pipeline and Large Language Models (LLMs) to provide context-aware interpretations of disease predictions and retrieve relevant disease information.",
        "Designed a human-in-the-loop feedback mechanism to capture user corrections, maintain feedback memory, and support continuous improvement of the explainable disease detection system.",
      ],
      technologies: [
        "TensorFlow",
        "Deep Learning",
        "Explainable AI",
        "Retrieval-Augmented Generation",
        "Large Language Models",
        "Human-in-the-Loop",
      ],
      githubUrl: "https://github.com/Lawapaul/Explainable_Plant_Disease_Prediction",
      visualTheme: "botanical-xai",
      accentHex: "#F29A4A",
      secondaryHex: "#E86A33",
    },
    {
      number: "03",
      id: "ai-agentic-ids",
      category: "Cybersecurity & Explainable AI",
      title: "AI Agentic IDS",
      subtitle: "Explainable AI-Based Intrusion Detection System",
      description: [
        "An intrusion detection platform designed to analyse network traffic using deep learning and support explainable security analysis through intelligent processing and response workflows.",
      ],
      technologies: ["Python", "Deep Learning", "Cybersecurity", "Explainable AI"],
      githubUrl: "https://github.com/Lawapaul/AI_Agentic_DL",
      visualTheme: "neural-shield",
      accentHex: "#E86A33",
      secondaryHex: "#C8C2BC",
    },
    {
      number: "04",
      id: "smart-parking-system",
      category: "Computer Vision",
      title: "ParkVision – Parking Guidance & Number Plate Recognition System",
      subtitle: "AI-Powered Parking Guidance and ANPR Platform",
      description: [
        "A real-time parking operations platform that tracks parking occupancy, recognizes number plates, and recommends available parking slots through a live dashboard.",
      ],
      technologies: ["Python", "OpenCV", "YOLOv8", "EasyOCR", "FastAPI", "React"],
      githubUrl:
        "https://github.com/Lawapaul/Smart-Parking-Guidance-and-Number-Plate-Recognition-System",
      visualTheme: "vision-grid",
      accentHex: "#C8C2BC",
      secondaryHex: "#E86A33",
    },
    {
      number: "05",
      id: "smart-irrigation-aquafield",
      category: "AI + IoT",
      title: "Smart Irrigation System — AquaField",
      subtitle: "ML-Powered Crop Water Prediction and ESP32 Automation",
      description: [
        "A sensor-driven irrigation platform that predicts crop water demand and automates motor control using real-time ESP32 telemetry, with safety mechanisms for rain and water-flow conditions.",
      ],
      technologies: ["Python", "Flask", "Machine Learning", "ESP32", "Arduino"],
      githubUrl: "https://github.com/Lawapaul/Smart-Irrigation-System",
      visualTheme: "telemetry-wave",
      accentHex: "#E86A33",
      secondaryHex: "#F29A4A",
    },
    {
      number: "06",
      id: "knowledge-graph-nlp-suite",
      category: "NLP & Knowledge Graphs",
      title: "Knowledge Graph NLP Suite",
      subtitle: "Explainable NLP Benchmarking and Knowledge Graph Generation",
      description: [
        "An NLP benchmarking and graph-generation suite focused on explainable text classification, triple extraction, and source-aware visualization workflows.",
      ],
      technologies: ["Python", "NLP", "Transformers", "spaCy", "Neo4j", "NetworkX"],
      githubUrl: "https://github.com/Lawapaul/Knowledge_Graph_using_enhanced_NLP",
      visualTheme: "knowledge-constellation",
      accentHex: "#F29A4A",
      secondaryHex: "#C8C2BC",
    },
    {
      number: "07",
      id: "padharoogo",
      category: "Full-Stack Web Engineering",
      title: "PadharooGo",
      subtitle: "Travel Stays and Booking Platform",
      description: [
        "A full-stack accommodation platform featuring property listings, authentication, media handling, reviews, and map-based stay discovery.",
      ],
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Passport.js",
        "Cloudinary",
        "Mapbox",
      ],
      githubUrl:
        "https://github.com/Lawapaul/PadharooGo-Full-stack-end-to-end-platform-for-travel-stays",
      liveDemoUrl: "https://padharoogo-full-stack-end-to-end.onrender.com/listings",
      visualTheme: "geospatial-atlas",
      accentHex: "#C8C2BC",
      secondaryHex: "#E86A33",
    },
    {
      number: "08",
      id: "securesign",
      category: "Cryptography & Security",
      title: "SecureSign",
      subtitle: "RSA-Based Digital Signature and File Integrity Verification System",
      description: [
        "A cryptography-focused application for secure document signing and file integrity verification using RSA-based digital signature workflows.",
      ],
      technologies: ["Python", "RSA", "Cryptography", "File Integrity"],
      githubUrl:
        "https://github.com/Lawapaul/SecureSign-RSA-Based-Digital-Signature-and-File-Integrity-Verification-System",
      visualTheme: "cipher-lattice",
      accentHex: "#E86A33",
      secondaryHex: "#C8C2BC",
    },
    {
      number: "09",
      id: "netra",
      category: "Embedded Systems",
      title: "Netra",
      subtitle: "Real-Time Sonar Mapping System Using Arduino",
      description: [
        "A sonar-style obstacle mapping system that combines ultrasonic sensing, servo scanning, and live radar visualization to provide spatial awareness.",
      ],
      technologies: ["Arduino Uno", "Embedded C", "HC-SR04", "Servo Motor", "Processing"],
      githubUrl: "https://github.com/Lawapaul/Netra---Sonar-Mapping-System",
      visualTheme: "sonar-sweep",
      accentHex: "#F29A4A",
      secondaryHex: "#E86A33",
    },
  ] satisfies PortfolioProject[],
};

export interface SkillCategoryItem {
  id: string;
  code: string;
  title: string;
  summary: string;
  accentHex: string;
  skills: string[];
  relatedProjects: string[];
}

export const EXPERTISE_DATA = {
  smallLabel: "EXPERTISE / 04",
  heading: "Tools I work with.",
  introduction:
    "My technical foundation spans artificial intelligence, machine learning, programming, software development, databases, and core computer science.",
  categories: [
    {
      id: "ai-ml",
      code: "SYS // 01",
      title: "Artificial Intelligence & Machine Learning",
      summary:
        "Neural architectures, representation learning, computer vision, natural language processing, and explainable model pipelines.",
      accentHex: "#E86A33",
      skills: [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "Natural Language Processing",
        "Computer Vision",
      ],
      relatedProjects: [
        "TriForge — Image Forgery Detection and Localization",
        "Explainable Plant Disease Detection Using Deep Learning",
        "AI Agentic IDS",
        "Knowledge Graph NLP Suite",
      ],
    },
    {
      id: "programming",
      code: "SYS // 02",
      title: "Programming Languages",
      summary:
        "Multi-paradigm fluency spanning high-level scientific computing, systems programming, relational querying, and hardware-level assembly.",
      accentHex: "#F29A4A",
      skills: [
        "Python",
        "C",
        "C++",
        "Java",
        "JavaScript",
        "SQL",
        "MATLAB",
        "Shell Scripting",
        "Assembly Language",
        "R",
      ],
      relatedProjects: [
        "AI Agentic IDS",
        "ParkVision – Parking Guidance & Number Plate Recognition System",
        "SecureSign",
        "Netra",
      ],
    },
    {
      id: "web-backend",
      code: "SYS // 03",
      title: "Web Development & Backend",
      summary:
        "Full-stack application architecture, asynchronous event-driven services, RESTful APIs, and interactive client interfaces.",
      accentHex: "#C8C2BC",
      skills: [
        "Node.js",
        "Express.js",
        "React.js",
        "REST APIs",
        "Socket.IO",
        "EJS",
      ],
      relatedProjects: ["PadharooGo", "ParkVision – Parking Guidance & Number Plate Recognition System"],
    },
    {
      id: "databases-tools",
      code: "SYS // 04",
      title: "Databases & Developer Tools",
      summary:
        "Relational and document data stores, containerization, version control, network simulation, and multi-platform engineering environments.",
      accentHex: "#E86A33",
      skills: [
        "MySQL",
        "MongoDB",
        "Docker",
        "Git",
        "Cisco Packet Tracer",
        "Linux",
        "macOS",
        "Windows",
        "StarUML",
      ],
      relatedProjects: ["PadharooGo", "Knowledge Graph NLP Suite"],
    },
    {
      id: "core-cs",
      code: "SYS // 05",
      title: "Core Computer Science",
      summary:
        "Theoretical and systems foundations governing algorithmic complexity, OS internals, database engines, networking protocols, and compilers.",
      accentHex: "#F29A4A",
      skills: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "Database Management Systems",
        "Computer Networks",
        "Computer Architecture",
        "Compiler Design",
      ],
      relatedProjects: ["AI Agentic IDS", "SecureSign"],
    },
    {
      id: "embedded-electronics",
      code: "SYS // 06",
      title: "Embedded Systems & Electronics",
      summary:
        "Microcontroller firmware, sensor telemetry, hardware-software co-design, circuit simulation, and digital logic verification.",
      accentHex: "#C8C2BC",
      skills: [
        "Arduino Programming",
        "8051 Microcontroller Programming",
        "LTspice",
        "Keil uVision",
        "ModelSim",
      ],
      relatedProjects: ["Smart Irrigation System — AquaField", "Netra"],
    },
  ] satisfies SkillCategoryItem[],
};

export interface CodingProfileItem {
  id: string;
  platform: string;
  username: string;
  url: string;
  roleLabel: string;
  description: string;
  isPrimary?: boolean;
  accentHex: string;
  badgeCode: string;
}

export const PROFILES_DATA = {
  smallLabel: "PROFILES / 05",
  heading: "Beyond the classroom.",
  introduction:
    "I believe consistent practice is an important part of becoming a better engineer. I use coding platforms to strengthen my problem-solving abilities, practice algorithms, and challenge myself with programming problems.",
  codolioPrimary: {
    id: "codolio",
    platform: "Codolio",
    username: "surferw96",
    url: "https://codolio.com/profile/surferw96",
    roleLabel: "PRIMARY ALGORITHMIC & DEVELOPMENT PORTFOLIO",
    description:
      "Unified problem-solving tracker aggregating verified competitive programming, algorithmic practice, and development activity under username @surferw96.",
    isPrimary: true,
    accentHex: "#E86A33",
    badgeCode: "PRIMARY // VERIFIED",
  },
  profiles: [
    {
      id: "leetcode",
      platform: "LeetCode",
      username: "harshit_shekhawat",
      url: "https://leetcode.com/u/harshit_shekhawat/",
      roleLabel: "DATA STRUCTURES & ALGORITHMS",
      description:
        "Regular algorithmic problem solving across arrays, dynamic programming, trees, graphs, and system design fundamentals.",
      accentHex: "#E86A33",
      badgeCode: "PLATFORM // 02",
    },
    {
      id: "geeksforgeeks",
      platform: "GeeksforGeeks",
      username: "surfe6mip",
      url: "https://www.geeksforgeeks.org/profile/surfe6mip",
      roleLabel: "COMPETITIVE & CORE CS PRACTICE",
      description:
        "Consistent problem solving across data structures, algorithmic paradigms, and foundational computer science tracks.",
      accentHex: "#F29A4A",
      badgeCode: "PLATFORM // 03",
    },
    {
      id: "github",
      platform: "GitHub",
      username: "Lawapaul",
      url: "https://github.com/Lawapaul",
      roleLabel: "OPEN-SOURCE & SYSTEM REPOSITORIES",
      description:
        "Source code repositories spanning deep learning pipelines, computer vision systems, full-stack platforms, and embedded firmware.",
      accentHex: "#C8C2BC",
      badgeCode: "PLATFORM // 04",
    },
    {
      id: "linkedin",
      platform: "LinkedIn",
      username: "harshitshekhawat",
      url: "https://www.linkedin.com/in/harshitshekhawat/",
      roleLabel: "PROFESSIONAL NETWORK & UPDATES",
      description:
        "Professional milestones, academic progression at VIT Chennai, technical discussions, and engineering collaborations.",
      accentHex: "#E86A33",
      badgeCode: "PLATFORM // 05",
    },
  ] satisfies CodingProfileItem[],
};

export interface EducationStage {
  number: string;
  id: string;
  title: string;
  statusLabel: string;
  isOngoingInterest?: boolean;
  summary: string;
  subjects: string[];
}

export const EDUCATION_DATA = {
  smallLabel: "EDUCATION / 06",
  heading: "Learning the fundamentals. Exploring what's possible.",
  institution: {
    university: "Vellore Institute of Technology — Chennai",
    degree: "Bachelor of Technology",
    branch: "Computer Science and Engineering",
    specialization: "Artificial Intelligence & Machine Learning",
    cgpa: "8.95",
    expectedGraduation: "May 2027",
  },
  schooling: {
    school: "Delhi Public School, Jodhpur",
    credentials: "Secondary and Senior Secondary School",
    completion: "Completed in May 2023",
    location: "Jodhpur, Rajasthan",
  },
  stages: [
    {
      number: "01",
      id: "engineering-foundations",
      title: "Engineering Foundations",
      statusLabel: "Academic Foundation",
      summary:
        "Core mathematical, physical, and programming fundamentals establishing structured engineering thinking and hardware-software literacy.",
      subjects: [
        "Python Programming",
        "C/C++ and OOP",
        "Digital System Design",
        "Electrical Engineering",
        "Engineering Physics",
        "Engineering Chemistry",
        "Calculus",
        "Differential Equations",
        "Technical Report Writing",
        "Communication and Soft Skills",
      ],
    },
    {
      number: "02",
      id: "core-computer-science",
      title: "Core Computer Science",
      statusLabel: "Core Curriculum",
      summary:
        "Rigorous study of algorithms, operating systems, computer architecture, networks, databases, discrete mathematics, and foundational AI.",
      subjects: [
        "Data Structures & Algorithms",
        "Computer Networks",
        "Theory of Computation",
        "Java Programming",
        "Microprocessors & Microcontrollers",
        "Discrete Mathematics & Graph Theory",
        "Web Programming",
        "Operating Systems",
        "DBMS",
        "Computer Architecture & Organization",
        "Artificial Intelligence",
        "Complex Variables & Linear Algebra",
      ],
    },
    {
      number: "03",
      id: "ai-advanced-computing",
      title: "AI & Advanced Computing",
      statusLabel: "Specialization Curriculum",
      summary:
        "Deep specialization in machine learning, deep neural architectures, computer vision, NLP, cryptography, compiler design, and cloud computing.",
      subjects: [
        "Machine Learning",
        "Deep Learning",
        "Software Engineering",
        "Compiler Design",
        "Cryptography & Network Security",
        "Machine Vision",
        "Speech & Language Processing",
        "Embedded Systems",
        "AWS Cloud Computing",
        "Probability & Statistics",
        "Design & Analysis of Algorithms",
        "Advanced Competitive Coding",
      ],
    },
    {
      number: "04",
      id: "continuing-learning",
      title: "Continuing Learning",
      statusLabel: "Ongoing Learning Interests",
      isOngoingInterest: true,
      summary:
        "Ongoing learning interests focused on bridging research models with resilient, scalable, real-world production engineering.",
      subjects: [
        "Production ML Systems",
        "MLOps",
        "Scalable AI Architectures",
        "Enterprise AI Solutions",
        "Real-Time Intelligent Applications",
        "End-to-End AI Pipelines",
        "Cloud-Native AI Deployment",
      ],
    },
  ] satisfies EducationStage[],
};

export const CONTACT_DATA = {
  smallLabel: "CONTACT / 07",
  heading: "Let's build something meaningful.",
  introduction:
    "I'm always interested in exploring interesting engineering problems, collaborating on meaningful projects, and connecting with people who share an interest in technology and innovation.",
  email: "harshitshekhawat501@gmail.com",
  recipientEmail: "harshitshekhawat501@gmail.com",
  emailHref: "mailto:harshitshekhawat501@gmail.com",
  github: "https://github.com/Lawapaul",
  githubHandle: "@Lawapaul",
  linkedin: "https://www.linkedin.com/in/harshitshekhawat/",
  linkedinHandle: "@harshitshekhawat",
  emailJsConfig: {
    publicKey: "VZpZaVf5dhrWsw9P3",
    serviceId: "service_5sctggw",
    templateId: "template_mbet98i",
  },
};

