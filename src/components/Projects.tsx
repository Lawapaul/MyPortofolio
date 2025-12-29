import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Chippin",
    subtitle: "Expense Management Platform",
    description:
      "A full-stack, real-time expense sharing platform with multi-user cost splitting, secure authentication, analytics dashboards, and automated debt reconciliation.",
    techStack: ["Node.js", "Express.js", "MySQL", "EJS", "Bootstrap", "Nodemailer"],
    hosting: "Hosted on Render",
    github: "https://github.com/Lawapaul/chippin",
    demo: "#",
    accent: "primary",
  },
  {
    title: "Netra",
    subtitle: "Real-Time Sonar Mapping System",
    description:
      "An intelligent sonar-based obstacle detection and spatial mapping system using Arduino and ultrasonic sensors, streaming radar-style real-time data to a live dashboard.",
    techStack: ["Arduino", "Ultrasonic Sensors", "Processing 3"],
    github: "https://github.com/Lawapaul/netra",
    accent: "cyber-teal",
  },
  {
    title: "PadharooGo",
    subtitle: "Travel Stay Platform",
    description:
      "A full-stack platform for listing and exploring boutique heritage stays with session-based authentication, image hosting, and geolocation.",
    techStack: ["Node.js", "Express.js", "MongoDB", "Passport.js", "Cloudinary", "Mapbox"],
    github: "https://github.com/Lawapaul/padharoogo",
    accent: "neon-green",
  },
];

const getAccentClasses = (accent: string) => {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    primary: { text: "text-primary", bg: "bg-primary/10", border: "hover:border-primary/50" },
    "cyber-teal": { text: "text-cyber-teal", bg: "bg-cyber-teal/10", border: "hover:border-cyber-teal/50" },
    "neon-green": { text: "text-neon-green", bg: "bg-neon-green/10", border: "hover:border-neon-green/50" },
  };
  return map[accent] || map.primary;
};

const Projects = () => {
  return (
    <section id="projects" className="section-container">
      <div className="gradient-blob w-[500px] h-[500px] bg-primary/20 -left-40 top-20 animate-pulse-glow" />
      <div className="gradient-blob w-[400px] h-[400px] bg-cyber-teal/15 right-0 bottom-40 animate-pulse-glow animation-delay-400" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">Featured Work</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            Projects
          </h2>
        </motion.div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {projects.map((project, index) => {
            const accent = getAccentClasses(project.accent);
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`glass-card-hover p-6 md:p-8 group ${accent.border}`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`font-heading text-2xl md:text-3xl font-bold ${accent.text} flex items-center gap-2`}>
                      {project.title}
                      <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-muted-foreground font-medium">{project.subtitle}</p>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="View GitHub repository">
                          <Github className="w-5 h-5" />
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="View live demo">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <p className="text-secondary-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-mono ${accent.bg} ${accent.text}`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.hosting && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground">
                      {project.hosting}
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
