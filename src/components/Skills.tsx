import { motion } from "framer-motion";
import { Check } from "lucide-react";

const skillCategories = [
  {
    title: "Artificial Intelligence & Core CS",
    skills: ["Machine Learning", "Artificial Intelligence", "Operating Systems", "DBMS", "Computer Networks", "Computer Architecture","scikit-learn (sklearn)"],
    accentColor: "primary",
  },
  {
    title: "Programming Languages",
    skills: ["Python", "C / C++", "Java", "JavaScript", "SQL", "MATLAB", "Shell & Assembly","R Studio"],
    accentColor: "cyber-teal",
  },
  {
    title: "Web & Backend",
    skills: ["Node.js", "Express.js", "React.js", "REST APIs", "Socket.IO", "EJS"],
    accentColor: "neon-green",
  },
  {
    title: "Databases & Tools",
    skills: ["MySQL", "MongoDB", "Docker", "Git", "Linux / macOS / Windows","StarUML"],
    accentColor: "destructive",
  },
];

const getAccentClasses = (accent: string) => {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
    "cyber-teal": { bg: "bg-cyber-teal/10", text: "text-cyber-teal", border: "border-cyber-teal/30" },
    "neon-green": { bg: "bg-neon-green/10", text: "text-neon-green", border: "border-neon-green/30" },
    destructive: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/30" },
  };
  return map[accent] || map.primary;
};

const Skills = () => {
  return (
    <section id="skills" className="section-container">
      {/* Gradient accents */}
      <div className="gradient-blob w-[500px] h-[500px] bg-primary/20 -left-40 top-1/4 animate-pulse-glow" />
      <div className="gradient-blob w-[400px] h-[400px] bg-neon-green/15 right-0 bottom-0 animate-pulse-glow animation-delay-400" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">Technical Expertise</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Skills & Technologies
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const accent = getAccentClasses(category.accentColor);
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className={`glass-card-hover p-6 md:p-8 border-l-2 ${accent.border}`}
              >
                <h3 className={`font-heading text-xl font-bold mb-6 ${accent.text}`}>
                  {category.title}
                </h3>
                <ul className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * skillIndex }}
                      className="flex items-center gap-2 text-sm text-secondary-foreground"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center ${accent.bg}`}>
                        <Check className={`w-3 h-3 ${accent.text}`} />
                      </div>
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
