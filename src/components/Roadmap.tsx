import { motion } from "framer-motion";
import { BookOpen, Brain, Code, Cpu, Rocket } from "lucide-react";

const milestones = [
  {
    icon: BookOpen,
    title: "Engineering & Programming Foundations",
    description:
      "Calculus, Differential Equations, Physics, Chemistry, Python, C/C++, EEE, DSD, Communication Skills",
    status: "completed",
  },
  {
    icon: Code,
    title: "Core Computer Science & Development",
    description:
      "DSA, OS, CN, TOC, Discrete Math, Graph Theory, Microprocessors, Web Programming, MERN Stack, AI Basics",
    status: "completed",
  },
  {
    icon: Brain,
    title: "AI & Algorithmic Thinking",
    description:
      "Machine Learning, Probability, Design & Analysis of Algorithms, Software Engineering",
    status: "completed",
  },
  {
    icon: Cpu,
    title: "Systems, Embedded & Cloud Computing",
    description:
      "Embedded Systems, AWS Cloud Systems, Scalable Architectures, Performance Optimization",
    status: "in-progress",
  },
  {
    icon: Rocket,
    title: "Industry-Ready AI Engineer",
    description:
      "Production ML, MLOps, End-to-End AI Systems, Enterprise-Scale Solutions",
    status: "upcoming",
  },
];

const Roadmap = () => {
  return (
    <section id="roadmap" className="section-container bg-background-secondary">
      <div className="gradient-blob w-[400px] h-[400px] bg-primary/20 -left-20 top-1/3 animate-pulse-glow" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">Journey</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Learning Roadmap
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-cyber-teal to-muted" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const isCompleted = milestone.status === "completed";
                const isInProgress = milestone.status === "in-progress";

                return (
                  <motion.div
                    key={milestone.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-16 md:pl-20"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-4 md:left-6 top-2 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 transition-all ${
                        isCompleted
                          ? "bg-neon-green border-neon-green shadow-lg shadow-neon-green/30"
                          : isInProgress
                          ? "bg-primary border-primary shadow-lg shadow-primary/30 animate-pulse"
                          : "bg-background border-muted-foreground"
                      }`}
                    />

                    <div
                      className={`glass-card-hover p-6 ${
                        isInProgress ? "border-primary/30" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                            isCompleted
                              ? "bg-neon-green/10"
                              : isInProgress
                              ? "bg-primary/10"
                              : "bg-muted"
                          }`}
                        >
                          <milestone.icon
                            className={`w-6 h-6 ${
                              isCompleted
                                ? "text-neon-green"
                                : isInProgress
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-heading text-lg font-bold">{milestone.title}</h3>
                            {isInProgress && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-primary/10 text-primary">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
