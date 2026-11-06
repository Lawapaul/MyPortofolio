import React, { useCallback, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSearchParams } from "react-router-dom";
import { Github, ExternalLink, Layers, X, ArrowUpRight } from "lucide-react";
import { PROJECTS_DATA, PortfolioProject } from "@/data/portfolioData";
import { PageShell } from "@/components/common/PageShell";
import { ProjectArtwork } from "@/components/projects/ProjectArtwork";
import { AppleHeroUnbox } from "@/components/common/AppleUnboxStage";

gsap.registerPlugin(ScrollTrigger);

interface InteractiveProjectCardProps {
  project: PortfolioProject;
  onSelect: (project: PortfolioProject) => void;
}

const InteractiveProjectCard: React.FC<InteractiveProjectCardProps> = ({
  project,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (mq.matches || isMobile || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          scale: 0.93,
          y: 28,
        },
        {
          scale: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 94%",
            end: "top 45%",
            scrub: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 4.5;
    const rx = -(py - 0.5) * 4.5;
    setTilt({ rx, ry, glareX: px * 100, glareY: py * 100 });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  };

  const surfaceClass =
    Number(project.number) % 3 === 1
      ? "surface-metallic"
      : Number(project.number) % 3 === 2
      ? "surface-glass"
      : "surface-graphite";

  const hasExtendedNarrative = project.description.length > 1;

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition:
          tilt.rx === 0 && tilt.ry === 0
            ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)"
            : "transform 0.08s linear",
      }}
      className={`group relative rounded-[1.75rem] sm:rounded-[2.25rem] ${surfaceClass} surface-interactive p-5 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden`}
    >
      {/* Dynamic subtle warm light response on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(460px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(232, 106, 51, 0.14), transparent 70%)`,
        }}
      />

      <div className="relative z-10 space-y-5 sm:space-y-6">
        {/* Top Row: Category Pill */}
        <div className="flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold tracking-wide bg-[#141519]/90 border border-[#F5F3F0]/16"
            style={{ color: project.accentHex }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: project.accentHex }}
            />
            <span className="truncate">{project.category}</span>
          </span>
        </div>

        {/* Project Artwork Stage */}
        <div
          onClick={() => onSelect(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(project);
            }
          }}
          aria-label={`Inspect ${project.title}`}
          className="cursor-pointer focus:outline-none"
        >
          <ProjectArtwork
            theme={project.visualTheme}
            number={project.number}
            accentHex={project.accentHex}
            secondaryHex={project.secondaryHex}
          />
        </div>

        {/* Title & Subtitle — Plus Jakarta Sans, Warm White & Light Gray (No Orange on Headings) */}
        <div className="space-y-2 pt-1">
          <h2 className="heading-card text-[#F5F3F0] font-heading font-bold transition-colors">
            {project.title}
          </h2>
          {project.subtitle && (
            <p className="text-sm sm:text-base font-semibold text-[#C8C5BF] font-heading leading-relaxed">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Primary Lead Description + Progressive Disclosure — DM Sans */}
        <div className="space-y-3">
          <p className="text-sm sm:text-base lg:text-[17px] text-[#C8C5BF] font-sans leading-[1.74] text-justify font-normal">
            {project.description[0]}
          </p>

          {hasExtendedNarrative && (
            <button
              type="button"
              onClick={() => onSelect(project)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#E86A33] hover:text-[#F29A4A] transition-colors text-left"
            >
              <span>
                Read complete system overview (+{project.description.length - 1} more{" "}
                {project.description.length - 1 === 1 ? "section" : "sections"})
              </span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </button>
          )}
        </div>

      </div>

      {/* Bottom Row: Tech Stack & Actions */}
      <div className="relative z-10 pt-6 mt-6 sm:mt-8 border-t border-white/10 space-y-5">
        {/* Technology Stack — JetBrains Mono */}
        <div className="flex flex-wrap gap-2" aria-label="Technology Stack">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#14151A]/90 border border-white/10 text-xs sm:text-[13px] font-normal text-[#C8C5BF] hover:border-[#E86A33]/40 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2.5">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#E86A33] hover:bg-[#F29A4A] text-[#101114] font-heading text-xs sm:text-sm font-semibold transition-all duration-300 shadow-[0_10px_24px_-8px_rgba(232,106,51,0.45)]"
              >
                <Github className="w-4 h-4 shrink-0" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            ) : null}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#F5F3F0] hover:bg-white text-[#121316] font-heading text-xs sm:text-sm font-bold transition-all duration-300"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#141519]/80 hover:bg-[#222024] border border-[#F5F3F0]/16 hover:border-[#E86A33]/50 text-xs sm:text-sm font-bold text-[#F5F3F0] transition-colors"
          >
            <span>System Details</span>
            <ArrowUpRight className="w-4 h-4 text-[#E86A33] shrink-0" />
          </button>
        </div>
      </div>
    </article>
  );
};

const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedProjectId = searchParams.get("project");

  const categories = [
    "All",
    ...Array.from(new Set(PROJECTS_DATA.projects.map((p) => p.category))),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS_DATA.projects
      : PROJECTS_DATA.projects.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    if (!requestedProjectId) {
      setActiveProject(null);
      return;
    }

    const project = PROJECTS_DATA.projects.find((p) => p.id === requestedProjectId);
    setActiveProject(project ?? null);
    if (project) setSelectedCategory("All");
  }, [requestedProjectId]);

  const closeProject = useCallback(() => {
    setActiveProject(null);
    if (searchParams.has("project")) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("project");
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const openProject = (project: PortfolioProject) => {
    setSearchParams({ project: project.id });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeProject]);

  return (
    <PageShell
      variant="projects-gallery"
      title="Projects | Harshit Singh Shekhawat — AI / ML Engineer"
    >
      <AppleHeroUnbox frameLabel="Selected Engineering Systems · Interactive Portfolio Archive">
        <div className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
          <section className="container">
            <div className="max-w-4xl mb-10 md:mb-14">
              <h1 className="display-section">{PROJECTS_DATA.heading}</h1>

              <p className="mt-5 sm:mt-6 body-large max-w-[62ch]">
                {PROJECTS_DATA.introduction}
              </p>
            </div>

            {/* Interactive Category Filter Bar */}
            <div
              className="flex flex-wrap items-center gap-2 sm:gap-2.5 pb-2"
              role="tablist"
              aria-label="Filter projects by domain"
            >
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                      active
                        ? "bg-[#E86A33] text-[#121316] shadow-[0_8px_28px_-6px_rgba(232,106,51,0.55)]"
                        : "surface-graphite text-[#C4BFB9] hover:text-[#F5F3F0] border border-[#F5F3F0]/16 hover:border-[#E86A33]/45"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </AppleHeroUnbox>

      <section className="container pb-20 sm:pb-24 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 xl:gap-10">
          {filteredProjects.map((project) => (
            <InteractiveProjectCard
              key={project.id}
              project={project}
              onSelect={openProject}
            />
          ))}
        </div>
      </section>

      {/* Smooth Project Detail Focus Modal */}
      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProject}
              className="fixed inset-0 z-50 bg-[#0D0E12]/85 backdrop-blur-md"
              aria-hidden="true"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 pointer-events-none">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-project-title"
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="project-focus-scroll pointer-events-auto w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-[1.75rem] sm:rounded-[2.25rem] surface-glass border border-[#E86A33]/40 p-6 sm:p-10 shadow-2xl space-y-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 min-w-0">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-[#E86A33]/18 border border-[#E86A33]/45 text-xs font-bold text-[#F29A4A]">
                      {activeProject.category}
                    </span>
                    <h2
                      id="modal-project-title"
                      className="font-heading text-xl sm:text-3xl font-extrabold text-[#F5F3F0]"
                    >
                      {activeProject.title}
                    </h2>
                    {activeProject.subtitle && (
                      <p className="text-sm sm:text-base font-semibold text-[#C8C2BC]">
                        {activeProject.subtitle}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={closeProject}
                    aria-label="Close project focus view"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1C1B1E] border border-[#F5F3F0]/18 flex items-center justify-center text-[#F5F3F0] hover:border-[#E86A33] transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <ProjectArtwork
                  theme={activeProject.visualTheme}
                  number={activeProject.number}
                  accentHex={activeProject.accentHex}
                  secondaryHex={activeProject.secondaryHex}
                />

                <div className="space-y-4">
                  {activeProject.description.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base lg:text-lg text-[#F5F3F0]/92 leading-[1.72] text-justify"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>


                <div className="space-y-3 pt-4 border-t border-[#F5F3F0]/12">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C8C2BC]">
                    <Layers className="w-4 h-4 text-[#E86A33]" />
                    <span>Technology Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1.5 rounded-xl bg-[#141519] border border-[#F5F3F0]/16 text-xs sm:text-sm font-semibold text-[#F5F3F0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#F5F3F0]/12">
                  {activeProject.githubUrl ? (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E86A33] text-[#121316] font-heading font-bold text-sm hover:bg-[#F29A4A] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Open GitHub Repository</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : null}

                  {activeProject.liveDemoUrl && (
                    <a
                      href={activeProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F3F0] text-[#121316] font-heading font-bold text-sm hover:bg-white transition-colors"
                    >
                      <span>Launch Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </PageShell>
  );
};

export default ProjectsPage;
