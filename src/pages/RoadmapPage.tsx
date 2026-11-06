import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  ChevronDown,
  BookOpen,
  Cpu,
  Brain,
  Compass,
  School,
} from "lucide-react";
import { EDUCATION_DATA } from "@/data/portfolioData";
import { PageShell } from "@/components/common/PageShell";
import { AppleHeroUnbox, AppleScrollBox } from "@/components/common/AppleUnboxStage";

const getStageIcon = (number: string) => {
  switch (number) {
    case "01":
      return BookOpen;
    case "02":
      return Cpu;
    case "03":
      return Brain;
    default:
      return Compass;
  }
};

const RoadmapPage: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>([
    EDUCATION_DATA.stages[0].id,
  ]);

  const toggleStage = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const inst = EDUCATION_DATA.institution;

  return (
    <PageShell
      variant="education-chronicle"
      title="Education | Harshit Singh Shekhawat — AI / ML Engineer"
    >
      <div className="space-y-10 sm:space-y-14 md:space-y-16 pb-12 sm:pb-16">
        <AppleHeroUnbox frameLabel="Vellore Institute of Technology · Academic Record">
          <section className="container pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
            <div className="max-w-4xl mb-10 md:mb-14">
              <h1 className="display-section">{EDUCATION_DATA.heading}</h1>
            </div>

            {/* ================= PRIMARY UNIVERSITY CREDENTIAL MONUMENT ================= */}
            <div className="rounded-[2rem] sm:rounded-[2.5rem] surface-metallic border border-[#E86A33]/35 p-6 sm:p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#E86A33]/14 blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                <div className="lg:col-span-8 space-y-4 sm:space-y-5">
                  <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#141519]/85 border border-[#E86A33]/40">
                    <GraduationCap className="w-4 h-4 text-[#E86A33] shrink-0" />
                    <span className="text-xs sm:text-[13px] font-bold text-[#F29A4A]">
                      Undergraduate Academic Record
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-[42px] font-extrabold tracking-tight text-[#F5F3F0] leading-[1.14]">
                    {inst.university}
                  </h2>

                  <div className="space-y-1.5 pt-1">
                    <p className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-[#D4D1CA]">
                      {inst.degree} in {inst.branch}
                    </p>
                    <p className="text-base sm:text-lg lg:text-xl font-medium text-[#C8C5BF]">
                      Specialization in {inst.specialization}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-6 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-10">
                  <div>
                    <span className="font-mono text-xs sm:text-[13px] font-medium uppercase tracking-wider text-[#9C9890] block">
                      Cumulative GPA
                    </span>
                    <span className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#E86A33] mt-1 block">
                      {inst.cgpa}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-xs sm:text-[13px] font-medium uppercase tracking-wider text-[#9C9890] block">
                      Expected Graduation
                    </span>
                    <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F5F3F0] mt-1 block">
                      {inst.expectedGraduation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= SECONDARY & SENIOR SECONDARY SCHOOL MONUMENT ================= */}
            <div className="mt-6 sm:mt-8 rounded-[1.75rem] sm:rounded-[2rem] surface-glass border border-white/10 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141519]/85 border border-white/10">
                    <School className="w-4 h-4 text-[#E86A33] shrink-0" />
                    <span className="font-mono text-xs sm:text-[13px] font-medium text-[#C8C5BF]">
                      High School
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#F5F3F0]">
                    {EDUCATION_DATA.schooling.school}
                  </h3>

                  <p className="body-standard text-[#C8C5BF] font-normal">
                    {EDUCATION_DATA.schooling.credentials}
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
                  <div>
                    <span className="font-mono text-xs sm:text-[13px] font-medium uppercase tracking-wider text-[#9C9890] block">
                      Timeline
                    </span>
                    <span className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-[#F5F3F0] mt-1 block">
                      {EDUCATION_DATA.schooling.completion}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-xs sm:text-[13px] font-medium uppercase tracking-wider text-[#9C9890] block">
                      Location
                    </span>
                    <span className="font-heading text-sm sm:text-base font-semibold text-[#D4D1CA] mt-0.5 block">
                      {EDUCATION_DATA.schooling.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AppleHeroUnbox>

        {/* ================= INTERACTIVE ACADEMIC LEARNING PROGRESSION TIMELINE ================= */}
        <section className="container">
          <AppleScrollBox mode="unbox-in" className="p-5 sm:p-10 lg:p-14">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F3F0] tracking-tight">
                    Academic Learning Progression
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedIds(EDUCATION_DATA.stages.map((s) => s.id))
                    }
                    className="px-4 sm:px-5 py-2 rounded-full bg-[#1C1B1E] hover:bg-[#262428] border border-[#E86A33]/40 text-xs sm:text-sm font-bold text-[#F5F3F0] transition-colors"
                  >
                    Expand All Stages
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpandedIds([EDUCATION_DATA.stages[0].id])}
                    className="px-4 sm:px-5 py-2 rounded-full bg-[#141519] hover:bg-[#1C1B1E] border border-[#F5F3F0]/14 text-xs sm:text-sm font-bold text-[#C4BFB9] transition-colors"
                  >
                    Focus View
                  </button>
                </div>
              </div>

              <div className="relative pl-5 sm:pl-10 space-y-5 sm:space-y-6">
                {/* Vertical Spine */}
                <div
                  aria-hidden="true"
                  className="absolute left-1.5 sm:left-3.5 top-6 bottom-6 w-px bg-gradient-to-b from-[#E86A33] via-[#C8C2BC]/35 to-[#F29A4A]"
                />

                {EDUCATION_DATA.stages.map((stage) => {
                  const isExpanded = expandedIds.includes(stage.id);
                  const Icon = getStageIcon(stage.number);

                  return (
                    <div key={stage.id} className="relative">
                      {/* Timeline Node Indicator */}
                      <div
                        aria-hidden="true"
                        className={`absolute -left-5 sm:-left-8 top-7 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300 ${
                          stage.isOngoingInterest
                            ? "bg-[#121316] border-[#F29A4A] shadow-[0_0_16px_rgba(242,154,74,0.65)]"
                            : isExpanded
                            ? "bg-[#E86A33] border-[#F5F3F0] shadow-[0_0_16px_rgba(232,106,51,0.6)]"
                            : "bg-[#1C1B1E] border-[#C8C2BC]/50"
                        }`}
                      />

                      <div
                        className={`rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-300 border ${
                          stage.isOngoingInterest
                            ? "surface-glass border-[#F29A4A]/45"
                            : isExpanded
                            ? "surface-graphite border-[#E86A33]/50"
                            : "surface-graphite border-[#F5F3F0]/14 hover:border-[#E86A33]/35"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleStage(stage.id)}
                          aria-expanded={isExpanded}
                          className="w-full text-left p-5 sm:p-8 flex items-start justify-between gap-4"
                        >
                          <div className="flex items-start gap-3.5 sm:gap-5 min-w-0">
                            <div
                              className={`w-11 h-11 sm:w-12 sm:h-12 p-3 rounded-2xl flex items-center justify-center shrink-0 border ${
                                stage.isOngoingInterest
                                  ? "bg-[#F29A4A]/15 border-[#F29A4A]/45 text-[#F29A4A]"
                                  : "bg-[#E86A33]/15 border-[#E86A33]/40 text-[#E86A33]"
                              }`}
                            >
                              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>

                            <div className="space-y-2 min-w-0">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <h3 className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold text-[#F5F3F0]">
                                  {stage.title}
                                </h3>
                                <span
                                  className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                                    stage.isOngoingInterest
                                      ? "bg-[#F29A4A]/20 text-[#F29A4A] border border-[#F29A4A]/45"
                                      : "bg-[#141519]/85 text-[#C8C2BC] border border-[#F5F3F0]/16"
                                  }`}
                                >
                                  {stage.statusLabel}
                                </span>
                              </div>

                              <p className="body-standard text-[#C4BFB9]">
                                {stage.summary}
                              </p>
                            </div>
                          </div>

                          <ChevronDown
                            className={`w-5 h-5 sm:w-6 sm:h-6 text-[#C8C2BC] shrink-0 mt-1 transition-transform duration-300 ${
                              isExpanded ? "rotate-180 text-[#E86A33]" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-[#F5F3F0]/12">
                                {stage.isOngoingInterest && (
                                  <p className="text-xs sm:text-sm font-semibold text-[#F29A4A] mb-3.5">
                                    Ongoing learning interests &amp; active exploration areas (distinct from completed university coursework):
                                  </p>
                                )}

                                <div className="flex flex-wrap gap-2">
                                  {stage.subjects.map((subject) => (
                                    <span
                                      key={subject}
                                      className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border ${
                                        stage.isOngoingInterest
                                          ? "bg-[#141519]/90 border-[#F29A4A]/35 text-[#F5F3F0]"
                                          : "bg-[#141519]/85 border-[#F5F3F0]/14 text-[#F5F3F0]"
                                      }`}
                                    >
                                      {subject}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AppleScrollBox>
        </section>
      </div>
    </PageShell>
  );
};

export default RoadmapPage;
