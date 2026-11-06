import React, { useCallback, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowUpRight,
  Brain,
  Code2,
  GraduationCap,
  School,
  Cpu,
  Layers,
  Database,
  Terminal,
  ExternalLink,
  Github,
  Mail,
  Sparkles,
  Award,
  BookOpen,
  X,
} from "lucide-react";
import {
  HOME_DATA,
  ABOUT_DATA,
  PROJECTS_DATA,
  EXPERTISE_DATA,
  EDUCATION_DATA,
  PROFILES_DATA,
} from "@/data/portfolioData";
import { PageShell } from "@/components/common/PageShell";
import { MascotScene } from "@/components/three/MascotScene";
import { MagneticWrapper } from "@/components/common/MagneticButton";
import { AppleHeroUnbox, AppleScrollBox } from "@/components/common/AppleUnboxStage";
import { ProjectArtwork } from "@/components/projects/ProjectArtwork";

const Index: React.FC = () => {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const mascotStageRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedProjectId = searchParams.get("project");
  const activeFeaturedProject = requestedProjectId
    ? PROJECTS_DATA.projects.find((project) => project.id === requestedProjectId) ?? null
    : null;

  const closeFeaturedProject = useCallback(() => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("project");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!activeFeaturedProject) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFeaturedProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFeaturedProject, closeFeaturedProject]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-stagger",
        { y: 16 },
        {
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
        }
      );

      if (mascotStageRef.current) {
        gsap.fromTo(
          mascotStageRef.current,
          { scale: 0.97, y: 14 },
          {
            scale: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          }
        );
      }
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  // Premier preview projects for the home overview
  const featuredProjects = PROJECTS_DATA.projects.slice(0, 3);

  return (
    <PageShell
      variant="home"
      title="Harshit Singh Shekhawat — AI / ML Engineer"
      hideFooter={false}
    >
      <div className="space-y-0 pb-16">
        {/* ================= 1. CINEMATIC HERO DISPLAY ================= */}
        <AppleHeroUnbox frameLabel="Harshit Singh Shekhawat · AI & ML Engineering Studio">
          <section
            ref={heroContainerRef}
            className="relative min-h-[88svh] flex items-center pt-28 pb-12 sm:pt-32 md:pt-32 md:pb-16 overflow-hidden"
          >
            <div className="container relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-center">
                {/* LEFT COLUMN: COMMANDING AGENCY TYPOGRAPHY */}
                <div className="lg:col-span-7 min-w-0 space-y-6 sm:space-y-7">
                  {/* AI / ML Engineer Tag Pill */}
                  <div className="hero-stagger">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#16171E]/80 border border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                      <span className="w-2 h-2 rounded-full bg-[#E86A33] shadow-[0_0_8px_#E86A33]" aria-hidden="true" />
                      <span className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#E2DFD8]">
                        AI / ML Engineer
                      </span>
                    </div>
                  </div>

                  {/* Hero Display Headline — Matching reference design */}
                  <div className="hero-stagger flex items-stretch gap-4 sm:gap-6">
                    <div className="w-1.5 sm:w-2 rounded-full bg-gradient-to-b from-[#FF7A30] to-[#E86A33] shrink-0 self-stretch my-1 shadow-[0_0_16px_rgba(232,106,51,0.6)]" />
                    <h1 className="font-heading text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
                      <span className="block text-[#F5F3F0]">Engineering</span>
                      <span className="block text-[#F5F3F0]">Intelligence.</span>
                      <span className="block text-[#E86A33] drop-shadow-[0_0_28px_rgba(232,106,51,0.35)]">
                        Building what
                      </span>
                      <span className="block text-[#E86A33] drop-shadow-[0_0_28px_rgba(232,106,51,0.35)]">
                        comes next.
                      </span>
                    </h1>
                  </div>

                  {/* Editorial Lead Copy — Clean & readable */}
                  <div className="hero-stagger max-w-[56ch]">
                    <p className="font-sans text-base sm:text-lg text-[#C8C5BF] leading-relaxed">
                      I'm a Computer Science and Engineering student at VIT Chennai, passionate about AI/ML, deep learning, and building intelligent systems that solve real-world problems.
                    </p>
                  </div>

                  {/* Primary & Secondary Call-To-Action Buttons */}
                  <div className="hero-stagger flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
                    <MagneticWrapper>
                      <Link
                        to={HOME_DATA.buttons.primary.path}
                        className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#E86A33] hover:bg-[#F29A4A] text-[#0A0B0E] font-heading font-bold text-sm sm:text-base transition-all duration-300 shadow-[0_12px_32px_-8px_rgba(232,106,51,0.55)] group"
                      >
                        <span>{HOME_DATA.buttons.primary.label}</span>
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </MagneticWrapper>

                    <MagneticWrapper>
                      <Link
                        to={HOME_DATA.buttons.secondary.path}
                        className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#14151C]/75 hover:bg-[#1E202A]/90 border border-white/15 hover:border-white/30 text-[#F5F3F0] font-heading font-medium text-sm sm:text-base transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                      >
                        <span>{HOME_DATA.buttons.secondary.label}</span>
                      </Link>
                    </MagneticWrapper>
                  </div>
                </div>

                {/* RIGHT COLUMN: 3D MASCOT FREELY FLOATING WITHOUT BOX */}
                <div className="lg:col-span-5 min-w-0 w-full flex items-center justify-center">
                  <div
                    ref={mascotStageRef}
                    className="relative w-full max-w-[480px] flex items-center justify-center"
                  >
                    <MascotScene variant="hero" frameless />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AppleHeroUnbox>

        {/* ================= 2. ABOUT & ENGINEERING BACKGROUND OVERVIEW ================= */}
        <section className="container py-12 md:py-16 lg:min-h-[100svh] lg:flex lg:items-center" aria-label="About Overview">
          <AppleScrollBox cinematic className="p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131419]/90 border border-white/10">
                  <Brain className="w-4 h-4 text-[#E86A33]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#C8C5BF]">
                    Overview // About & Background
                  </span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F3F0] tracking-tight">
                  Bridging theory with tangible systems.
                </h2>

                <p className="body-large text-[#C8C5BF] font-sans font-normal text-justify">
                  {ABOUT_DATA.paragraphs[0]}
                </p>

                <p className="body-standard text-[#B8B5AE] font-sans font-normal text-justify">
                  {ABOUT_DATA.paragraphs[1]}
                </p>

                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 mb-4 rounded-full bg-[#E86A33] hover:bg-[#F29A4A] border border-[#E86A33]/70 text-sm font-heading font-semibold text-[#101114] transition-all group shadow-[0_8px_24px_-6px_rgba(232,106,51,0.35)]"
                  >
                    <span>Read Full Story &amp; Academic Background</span>
                    <ArrowUpRight className="w-4 h-4 text-[#101114] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>

              {/* Snapshot Metrics Grid */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl surface-graphite p-5 border border-white/10 space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#9C9890] block">
                    Institution
                  </span>
                  <p className="font-heading font-bold text-base text-[#F5F3F0]">
                    VIT Chennai
                  </p>
                  <p className="text-xs text-[#C8C5BF]">B.Tech Computer Science</p>
                </div>

                <div className="rounded-2xl surface-graphite p-5 border border-white/10 space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#9C9890] block">
                    Specialization
                  </span>
                  <p className="font-heading font-bold text-base text-[#F5F3F0]">
                    AI &amp; Machine Learning
                  </p>
                  <p className="text-xs text-[#C8C5BF]">Systems &amp; Models</p>
                </div>

                <div className="rounded-2xl surface-graphite p-5 border border-white/10 space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#9C9890] block">
                    Academic Record
                  </span>
                  <p className="font-heading font-extrabold text-2xl text-[#E86A33]">
                    8.95 CGPA
                  </p>
                  <p className="text-xs text-[#C8C5BF]">Cumulative Score</p>
                </div>

                <div className="rounded-2xl surface-graphite p-5 border border-white/10 space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#9C9890] block">
                    Schooling
                  </span>
                  <p className="font-heading font-bold text-base text-[#F5F3F0]">
                    DPS Jodhpur
                  </p>
                  <p className="text-xs text-[#C8C5BF]">Completed May 2023</p>
                </div>
              </div>
            </div>
          </AppleScrollBox>
        </section>

        {/* ================= 3. FEATURED PROJECTS OVERVIEW ================= */}
        <section className="container py-12 md:py-16 lg:min-h-[100svh] lg:flex lg:items-center" aria-label="Featured Projects Overview">
          <AppleScrollBox cinematic className="p-6 sm:p-10 lg:p-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131419]/90 border border-white/10">
                  <Cpu className="w-4 h-4 text-[#E86A33]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#C8C5BF]">
                    Overview // Selected Work
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F3F0] tracking-tight">
                  Featured Systems &amp; Projects
                </h2>
                <p className="body-standard text-[#C8C5BF] font-sans">
                  Highlighting production-oriented architectures, computer vision pipelines, and deep learning implementations.
                </p>
              </div>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 mb-4 rounded-full bg-[#E86A33] hover:bg-[#F29A4A] text-[#101114] font-heading font-semibold text-sm transition-all shadow-[0_8px_24px_-6px_rgba(232,106,51,0.4)] shrink-0 self-start sm:self-auto group"
              >
                <span>View All 6 Projects</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* 3 Concise Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl surface-glass p-6 border border-white/10 flex flex-col justify-between space-y-5 hover:border-white/20 transition-all"
                >
                  <div className="space-y-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#14151B] border border-white/10 text-[#C8C5BF]">
                      {project.category}
                    </span>

                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5F3F0] leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#C8C5BF] font-sans line-clamp-3 leading-relaxed">
                      {project.description[0]}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-white/8">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-[#14151A] border border-white/10 text-[#C8C5BF]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        to={`/?project=${encodeURIComponent(project.id)}`}
                        onClick={(event) => {
                          event.preventDefault();
                          setSearchParams({ project: project.id });
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E86A33] hover:text-[#F29A4A] transition-colors"
                      >
                        <span>Inspect Architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#9C9890] hover:text-[#F5F3F0] transition-colors"
                          aria-label={`GitHub for ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AppleScrollBox>
        </section>

        {/* ================= 4. TECHNICAL EXPERTISE OVERVIEW ================= */}
        <section className="container py-12 md:py-16" aria-label="Technical Expertise Overview">
          <AppleScrollBox className="p-6 sm:p-10 lg:p-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131419]/90 border border-white/10">
                  <Code2 className="w-4 h-4 text-[#E86A33]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#C8C5BF]">
                    Overview // Technical Stack
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F3F0] tracking-tight">
                  Core Technical Capabilities
                </h2>
                <p className="body-standard text-[#C8C5BF] font-sans">
                  Structured tools, deep learning frameworks, and systems engineering libraries used in production and research.
                </p>
              </div>

              <Link
                to="/skills"
                className="inline-flex items-center gap-2 px-6 py-3 mb-4 rounded-full bg-[#E86A33] hover:bg-[#F29A4A] border border-[#E86A33]/70 text-sm font-heading font-semibold text-[#101114] transition-all group shrink-0 self-start sm:self-auto shadow-[0_8px_24px_-6px_rgba(232,106,51,0.4)]"
              >
                <span>Full Technical Index</span>
                <ArrowUpRight className="w-4 h-4 text-[#101114] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* 4 Concise Expertise Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-4 sm:gap-5">
              {EXPERTISE_DATA.categories.slice(0, 4).map((category) => (
                <div
                  key={category.id}
                  className="h-full min-h-[18rem] sm:min-h-[20rem] rounded-2xl surface-graphite p-5 border border-white/10 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-2">
                    <h3 className="min-h-[2.75rem] font-heading font-bold text-base sm:text-lg text-[#F5F3F0]">
                      {category.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#C8C5BF] font-sans">
                      {category.summary}
                    </p>
                  </div>

                  <div className="mt-auto min-h-[4.5rem] sm:min-h-[5.25rem] flex flex-wrap content-start gap-1.5 pt-3 border-t border-white/8">
                    {category.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[#14151A] border border-white/10 text-[#C8C5BF]"
                      >
                        {skill}
                      </span>
                    ))}
                    {category.skills.length > 4 && (
                      <span className="font-mono text-[11px] px-2 py-1 text-[#9C9890]">
                        +{category.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AppleScrollBox>
        </section>

        {/* ================= 5. EDUCATION & CREDENTIALS OVERVIEW ================= */}
        <section className="container py-12 md:py-16 lg:min-h-[100svh] lg:flex lg:items-center" aria-label="Education Overview">
          <AppleScrollBox cinematic className="p-6 sm:p-10 lg:p-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131419]/90 border border-white/10">
                  <GraduationCap className="w-4 h-4 text-[#E86A33]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#C8C5BF]">
                    Overview // Academic Track Record
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F3F0] tracking-tight">
                  Academic Foundation
                </h2>
                <p className="body-standard text-[#C8C5BF] font-sans">
                  Rigorous engineering training across core CS curriculum, mathematics, and artificial intelligence specialization.
                </p>
              </div>

              <Link
                to="/education"
                className="inline-flex items-center gap-2 px-6 py-3 mb-4 rounded-full bg-[#E86A33] hover:bg-[#F29A4A] border border-[#E86A33]/70 text-sm font-heading font-semibold text-[#101114] transition-all group shrink-0 self-start sm:self-auto shadow-[0_8px_24px_-6px_rgba(232,106,51,0.4)]"
              >
                <span>View Full Roadmap</span>
                <ArrowUpRight className="w-4 h-4 text-[#101114] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr gap-5 sm:gap-6">
              {/* VIT Chennai Card */}
              <div className="h-full rounded-2xl surface-glass p-6 sm:p-7 border border-white/10 flex flex-col gap-3 md:justify-between">
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-[#141519] border border-white/10 text-[#C8C5BF]">
                    Undergraduate
                  </span>
                  <span className="shrink-0 text-right font-heading font-extrabold text-base sm:text-lg lg:text-xl text-[#E86A33]">
                    CGPA {EDUCATION_DATA.institution.cgpa}
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5F3F0]">
                  {EDUCATION_DATA.institution.university}
                </h3>

                <p className="text-sm text-[#C8C5BF] font-sans">
                  {EDUCATION_DATA.institution.degree} in {EDUCATION_DATA.institution.branch}
                </p>
                <p className="font-mono text-xs text-[#9C9890]">
                  Expected Graduation: {EDUCATION_DATA.institution.expectedGraduation}
                </p>
              </div>

              {/* DPS Jodhpur Card (Strictly No Marks) */}
              <div className="h-full rounded-2xl surface-glass p-6 sm:p-7 border border-white/10 flex flex-col gap-3 md:justify-between">
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-[#141519] border border-white/10 text-[#C8C5BF]">
                    High School
                  </span>
                  <span className="font-mono text-xs text-[#9C9890]">
                    Completed May 2023
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5F3F0]">
                  {EDUCATION_DATA.schooling.school}
                </h3>

                <p className="text-sm text-[#C8C5BF] font-sans">
                  {EDUCATION_DATA.schooling.credentials}
                </p>
                <p className="font-mono text-xs text-[#9C9890]">
                  Location: {EDUCATION_DATA.schooling.location}
                </p>
              </div>
            </div>
          </AppleScrollBox>
        </section>

        {/* ================= 6. PROFILES & DIRECT CONTACT CALL-TO-ACTION ================= */}
        <section className="container py-12 md:py-16 lg:min-h-[100svh] lg:flex lg:items-center" aria-label="Profiles and Contact Overview">
          <AppleScrollBox cinematic className="p-6 sm:p-10 lg:p-12 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131419]/90 border border-white/10">
                  <Mail className="w-4 h-4 text-[#E86A33]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#C8C5BF]">
                    Get in Touch // Professional Network
                  </span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F3F0] tracking-tight">
                  Interested in collaborating or discussing systems architecture?
                </h2>

                <p className="body-standard text-[#C8C5BF] font-sans">
                  Available for research collaborations, engineering internships, and building intelligent production systems.
                </p>

                {/* Platform Links */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {PROFILES_DATA.profiles.slice(0, 5).map((profile) => (
                    <a
                      key={profile.id}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-[#14151A] hover:bg-[#1C1E26] border border-white/10 hover:border-[#E86A33]/50 text-[#C8C5BF] hover:text-white transition-all flex items-center gap-1.5"
                    >
                      <span>{profile.platform}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#E86A33]" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3.5">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#E86A33] hover:bg-[#F29A4A] text-[#101114] font-heading font-semibold text-sm transition-all shadow-[0_12px_32px_-8px_rgba(232,106,51,0.45)] group"
                >
                  <span>Open Contact Terminal</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  to="/profiles"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full surface-glass hover:bg-[#1C1E26]/90 border border-white/12 text-sm font-heading font-semibold text-[#F5F3F0] transition-all"
                >
                  <span>View All Verified Profiles</span>
                </Link>
              </div>
            </div>
          </AppleScrollBox>
        </section>
      </div>

      <AnimatePresence>
        {activeFeaturedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFeaturedProject}
              className="fixed inset-0 z-[80] bg-[#0D0E12]/88 backdrop-blur-md"
              aria-hidden="true"
            />
            <div className="fixed inset-0 z-[81] flex items-center justify-center p-3 sm:p-6 pointer-events-none">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="home-project-focus-title"
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="project-focus-scroll pointer-events-auto w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-[1.75rem] sm:rounded-[2.25rem] surface-glass border border-[#E86A33]/40 p-6 sm:p-10 shadow-2xl space-y-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 min-w-0">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-[#E86A33]/18 border border-[#E86A33]/45 text-xs font-bold text-[#F29A4A]">
                      {activeFeaturedProject.category}
                    </span>
                    <h2 id="home-project-focus-title" className="font-heading text-xl sm:text-3xl font-extrabold text-[#F5F3F0]">
                      {activeFeaturedProject.title}
                    </h2>
                    {activeFeaturedProject.subtitle && (
                      <p className="text-sm sm:text-base font-semibold text-[#C8C2BC]">
                        {activeFeaturedProject.subtitle}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={closeFeaturedProject}
                    aria-label="Close project focus view"
                    className="w-10 h-10 rounded-full bg-[#1C1B1E] border border-white/15 flex items-center justify-center text-[#F5F3F0] hover:border-[#E86A33] transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <ProjectArtwork
                  theme={activeFeaturedProject.visualTheme}
                  number={activeFeaturedProject.number}
                  accentHex={activeFeaturedProject.accentHex}
                  secondaryHex={activeFeaturedProject.secondaryHex}
                />

                <div className="space-y-4">
                  {activeFeaturedProject.description.map((paragraph, index) => (
                    <p key={index} className="text-sm sm:text-base text-[#F5F3F0]/92 leading-[1.72]">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-white/12">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C8C2BC]">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeFeaturedProject.technologies.map((technology) => (
                      <span key={technology} className="px-3.5 py-1.5 rounded-xl bg-[#141519] border border-white/15 text-xs sm:text-sm font-semibold text-[#F5F3F0]">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/12">
                  {activeFeaturedProject.githubUrl && (
                    <a
                      href={activeFeaturedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-[#F5F3F0] font-semibold text-sm hover:border-[#E86A33]/55 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub Repository</span>
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

export default Index;
