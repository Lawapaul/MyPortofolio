import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

import { Button } from "@/components/ui/button";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  accent: "primary" | "cyber-teal" | "neon-green";
  accentLabel: string;
};

const projects: Project[] = [
  {
    title: "Chippin",
    subtitle: "Expense Management Platform",
    description:
      "A full-stack, real-time expense sharing platform with multi-user cost splitting, secure authentication, analytics dashboards, and automated debt reconciliation.",
    techStack: ["Node.js", "Express.js", "MySQL", "EJS", "Bootstrap", "Nodemailer"],
    highlights: [
      "Built secure multi-user auth and session flows",
      "Added live expense settlement and debt reconciliation",
      "Shipped dashboards and notification workflows",
    ],
    github: "https://github.com/Lawapaul/Chippin-ExpenseTracker2.0",
    demo: "https://chippin-expensetracker2-0.onrender.com/auth",
    accent: "primary",
    accentLabel: "Full-Stack",
  },
  {
    title: "AI Agentic IDS",
    subtitle: "Explainable Multi-Agent Intrusion Detection and Response Pipeline",
    description:
      "Engineered a full-stack AI intrusion detection system using deep learning, explainability, graph analytics, memory retrieval, and LLM-based reasoning on CICIDS2017 network traffic. Benchmarked six model families and multiple risk-fusion and planner strategies, reaching 98.40% accuracy and 99.16% memory retrieval top-1 accuracy while adding human review, feedback persistence, and retraining for realistic security operations.",
    techStack: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "SQLite",
      "Hugging Face",
      "NetworkX",
      "NumPy",
      "pandas",
    ],
    highlights: [
      "98.40% IDS classification accuracy using ResNet",
      "Benchmarked CNN, LSTM, GRU, Transformer, and Hybrid models",
      "Implemented explainability with LIME and feature-gradient saliency",
      "Added graph-based attack correlation and adaptive risk fusion",
      "Built memory-augmented retrieval and LLM cybersecurity reasoning",
      "Integrated human-in-the-loop feedback and RL retraining pipeline",
    ],
    github: "https://github.com/Lawapaul/AI_Agentic_DL",
    accent: "cyber-teal",
    accentLabel: "AI Security",
  },
  {
    title: "Netra",
    subtitle: "Real-Time Sonar Mapping System",
    description:
      "An intelligent sonar-based obstacle detection and spatial mapping system using Arduino and ultrasonic sensors, streaming radar-style real-time data to a live dashboard.",
    techStack: ["Arduino", "Ultrasonic Sensors", "Processing 3"],
    highlights: [
      "Captured live sonar readings with low-latency updates",
      "Visualized obstacle proximity in a radar-like interface",
      "Connected embedded sensing to a real-time dashboard",
    ],
    github: "https://github.com/Lawapaul/Netra---Sonar-Mapping-System",
    accent: "cyber-teal",
    accentLabel: "Embedded AI",
  },
  {
    title: "PadharooGo",
    subtitle: "Travel Stay Platform",
    description:
      "A full-stack platform for listing and exploring boutique heritage stays with session-based authentication, image hosting, and geolocation.",
    techStack: ["Node.js", "Express.js", "MongoDB", "Passport.js", "Cloudinary", "Mapbox"],
    highlights: [
      "Implemented property discovery with mapped locations",
      "Handled media uploads and listing management",
      "Designed a polished travel-focused browsing flow",
    ],
    github: "https://github.com/Lawapaul/PadharooGo-Full-stack-end-to-end-platform-for-travel-stays",
    demo: "https://padharoogo-full-stack-end-to-end.onrender.com/listings",
    accent: "neon-green",
    accentLabel: "Platform Build",
  },
];

const accentMap: Record<Project["accent"], {
  glow: string;
  badge: string;
  border: string;
  icon: string;
  ring: string;
}> = {
  primary: {
    glow: "from-primary/30 via-primary/10 to-transparent",
    badge: "bg-primary/12 text-primary",
    border: "border-primary/20",
    icon: "text-primary",
    ring: "group-hover:shadow-primary/20",
  },
  "cyber-teal": {
    glow: "from-cyber-teal/30 via-cyber-teal/10 to-transparent",
    badge: "bg-cyber-teal/12 text-cyber-teal",
    border: "border-cyber-teal/20",
    icon: "text-cyber-teal",
    ring: "group-hover:shadow-cyber-teal/20",
  },
  "neon-green": {
    glow: "from-neon-green/30 via-neon-green/10 to-transparent",
    badge: "bg-neon-green/12 text-neon-green",
    border: "border-neon-green/20",
    icon: "text-neon-green",
    ring: "group-hover:shadow-neon-green/20",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const accent = accentMap[project.accent];

  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl ${accent.border} ${accent.ring}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${accent.glow} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[calc(1.5rem-1px)] border border-white/5 opacity-80"
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="space-y-3">
            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-[0.24em] ${accent.badge}`}>
              {project.accentLabel}
            </span>
            <div>
              <h3 className="font-heading text-2xl font-bold leading-tight text-foreground md:text-[1.75rem]">
                {project.title}
              </h3>
              <p className="mt-2 max-w-[30rem] text-sm font-medium leading-relaxed text-muted-foreground md:text-base">
                {project.subtitle}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {project.github && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-white/10 bg-background/30 text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-background/60 hover:text-foreground"
                asChild
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} GitHub repository`}
                >
                  <Github className={`h-5 w-5 ${accent.icon}`} />
                </a>
              </Button>
            )}
            {project.demo && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-white/10 bg-background/30 text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-background/60 hover:text-foreground"
                asChild
              >
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live demo`}
                >
                  <ExternalLink className={`h-5 w-5 ${accent.icon}`} />
                </a>
              </Button>
            )}
          </div>
        </div>

        <p className="relative z-10 text-sm leading-7 text-secondary-foreground md:text-[15px]">
          {project.description}
        </p>

        <div className="relative z-10 mt-6">
          <h4 className="mb-3 text-xs font-mono uppercase tracking-[0.28em] text-muted-foreground">
            Key Highlights
          </h4>
          <ul className="grid gap-2 text-sm text-secondary-foreground">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 leading-6">
                <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent.badge}`} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`rounded-full border border-white/10 px-3 py-1.5 text-xs font-mono ${accent.badge}`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3 pt-2">
          {project.github && (
            <Button
              variant="outline"
              className="border-white/10 bg-background/30 hover:border-primary/40 hover:bg-background/60"
              asChild
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                View Code
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.demo && (
            <Button
              variant="ghost"
              className="text-secondary-foreground hover:bg-background/50 hover:text-foreground"
              asChild
            >
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                Live Demo
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="section-container">
      <div className="gradient-blob left-[-10rem] top-20 h-[500px] w-[500px] bg-primary/20 animate-pulse-glow" />
      <div className="gradient-blob bottom-32 right-[-3rem] h-[420px] w-[420px] bg-cyber-teal/15 animate-pulse-glow animation-delay-400" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="font-mono text-sm uppercase tracking-widest text-primary">
            Featured Work
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold md:text-5xl lg:text-6xl">
            Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-7 text-muted-foreground md:text-lg">
            Selected builds across AI systems, full-stack engineering, and real-world product development.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
