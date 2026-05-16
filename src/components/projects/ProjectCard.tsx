import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { ProjectAccent, ProjectItem } from "./project-data";

const accentStyles: Record<
  ProjectAccent,
  {
    border: string;
    glow: string;
    badge: string;
    icon: string;
    pill: string;
    dot: string;
    spotlight: string;
  }
> = {
  primary: {
    border: "border-primary/20 hover:border-primary/45",
    glow: "from-primary/20 via-primary/5 to-transparent",
    badge: "border-primary/25 bg-primary/10 text-primary",
    icon: "text-primary",
    pill: "border-primary/20 bg-primary/10 text-primary/90",
    dot: "bg-primary",
    spotlight: "rgba(255, 122, 0, 0.18)",
  },
  "cyber-teal": {
    border: "border-cyber-teal/20 hover:border-cyber-teal/45",
    glow: "from-cyber-teal/20 via-cyber-teal/5 to-transparent",
    badge: "border-cyber-teal/25 bg-cyber-teal/10 text-cyber-teal",
    icon: "text-cyber-teal",
    pill: "border-cyber-teal/20 bg-cyber-teal/10 text-cyber-teal/90",
    dot: "bg-cyber-teal",
    spotlight: "rgba(26, 216, 207, 0.18)",
  },
  "neon-green": {
    border: "border-neon-green/20 hover:border-neon-green/45",
    glow: "from-neon-green/20 via-neon-green/5 to-transparent",
    badge: "border-neon-green/25 bg-neon-green/10 text-neon-green",
    icon: "text-neon-green",
    pill: "border-neon-green/20 bg-neon-green/10 text-neon-green/90",
    dot: "bg-neon-green",
    spotlight: "rgba(46, 255, 157, 0.16)",
  },
  destructive: {
    border: "border-destructive/20 hover:border-destructive/45",
    glow: "from-destructive/20 via-destructive/5 to-transparent",
    badge: "border-destructive/25 bg-destructive/10 text-destructive",
    icon: "text-destructive",
    pill: "border-destructive/20 bg-destructive/10 text-destructive/90",
    dot: "bg-destructive",
    spotlight: "rgba(238, 63, 122, 0.16)",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const accent = accentStyles[project.accent];
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={cardVariants}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        setSpotlight({ x, y });
      }}
      className={cn(
        "group relative flex h-full min-h-[30rem] flex-col overflow-hidden rounded-[1.75rem] border bg-card/65 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(0,0,0,0.38)] sm:p-6",
        accent.border,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br opacity-70 transition-opacity duration-500 group-hover:opacity-100",
          accent.glow,
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[calc(1.75rem-1px)] border border-white/8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, ${accent.spotlight} 0%, transparent 42%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em]",
                accent.badge,
              )}
            >
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-white/70">
                <Sparkles className="h-3 w-3" />
                Featured
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-[1.65rem] font-bold leading-tight text-foreground sm:text-[1.85rem]">
              {project.title}
            </h3>
            <p className="max-w-[34rem] text-sm font-medium leading-6 text-white/72 sm:text-[15px]">
              {project.subtitle}
            </p>
          </div>
        </div>

        <p className="mt-5 min-h-[4.75rem] text-sm leading-6 text-secondary-foreground sm:text-[15px]">
          {project.description}
        </p>

        <ul className="mt-5 grid gap-2 text-sm text-white/84">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 leading-6">
              <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", accent.dot)} />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={cn(
                "rounded-full border px-3 py-1 text-[11px] font-mono tracking-[0.02em] backdrop-blur-sm",
                accent.pill,
              )}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-6">
          <Button
            variant="outline"
            size="icon"
            className="group h-11 w-11 rounded-full border-white/12 bg-background/20 hover:border-white/25 hover:bg-background/40"
            asChild
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} GitHub repository in a new tab`}
            >
              <Github className={cn("h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6", accent.icon)} />
            </a>
          </Button>

          {project.demo && (
            <Button
              variant="ghost"
              className="group rounded-full border border-white/12 bg-background/20 px-4 text-sm text-white/88 transition-all duration-300 hover:border-white/25 hover:bg-background/40 hover:text-foreground"
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
}
