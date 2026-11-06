import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { EXPERTISE_DATA, SkillCategoryItem } from "@/data/portfolioData";
import { PageShell } from "@/components/common/PageShell";
import { AppleHeroUnbox, AppleScrollBox } from "@/components/common/AppleUnboxStage";

const SkillsPage: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    EXPERTISE_DATA.categories[0].id
  );
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeCategory: SkillCategoryItem =
    EXPERTISE_DATA.categories.find((c) => c.id === selectedCategoryId) ||
    EXPERTISE_DATA.categories[0];

  return (
    <PageShell
      variant="expertise-ecosystem"
      title="Technical Expertise | Harshit Singh Shekhawat — AI / ML Engineer"
    >
      <div className="space-y-10 sm:space-y-14 md:space-y-16 pb-12 sm:pb-16">
        {/* ================= HEADER & INTERACTIVE DOMAIN ARCHITECTURE ================= */}
        <AppleHeroUnbox frameLabel="Technical Architecture · Interactive Domain Explorer">
          <section className="container pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
            <div className="max-w-4xl mb-10 md:mb-14">
              <h1 className="display-section">{EXPERTISE_DATA.heading}</h1>

              <p className="mt-5 sm:mt-6 body-large max-w-[60ch]">
                {EXPERTISE_DATA.introduction}
              </p>
            </div>

            {/* Interactive Technical Ecosystem */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 xl:gap-12 items-stretch">
              {/* Left Column: Selectable Domain Tabs */}
              <div
                className="lg:col-span-5 flex flex-col gap-3"
                role="tablist"
                aria-label="Technical Expertise Categories"
              >
                {EXPERTISE_DATA.categories.map((category) => {
                  const isSelected = category.id === selectedCategoryId;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedCategoryId(category.id);
                        setHoveredSkill(null);
                      }}
                      className={`w-full text-left rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${
                        isSelected
                          ? "surface-metallic border-[#E86A33]/75 shadow-[0_20px_50px_-15px_rgba(232,106,51,0.32)]"
                          : "surface-graphite border-[#F5F3F0]/12 hover:border-[#E86A33]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-[#F5F3F0] leading-snug">
                          {category.title}
                        </h2>

                        <span
                          className="font-mono text-xs sm:text-[13px] font-medium px-3 py-1 rounded-full bg-[#131419]/90 border border-white/10 text-[#C8C5BF] shrink-0"
                        >
                          {category.skills.length} tools
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Interactive Connection Map & Active Domain Detail */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeCategory.id}
                    initial={{ opacity: 0.9, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-[1.75rem] sm:rounded-[2rem] surface-glass border border-white/10 p-6 sm:p-10 flex flex-col justify-between space-y-8"
                  >
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F3F0] tracking-tight">
                        {activeCategory.title}
                      </h3>
                      <p className="body-large text-[#C8C5BF] font-sans font-normal">
                        {activeCategory.summary}
                      </p>
                    </div>

                    {/* Interactive Neural Connection Stage */}
                    <div className="relative rounded-2xl sm:rounded-3xl bg-[#141519]/85 border border-[#F5F3F0]/14 p-5 sm:p-7 overflow-hidden">
                      <div className="absolute inset-0 grid-backdrop opacity-25 pointer-events-none" />

                      {/* SVG Animated Connection Curves */}
                      <svg
                        viewBox="0 0 600 110"
                        className="w-full h-20 sm:h-24 mb-5 pointer-events-none"
                        aria-hidden="true"
                      >
                        {activeCategory.skills.map((skill, idx) => {
                          const total = activeCategory.skills.length;
                          const targetX =
                            total === 1
                              ? 300
                              : 45 + (idx / (total - 1)) * 510;
                          const isHighlighted =
                            hoveredSkill === null || hoveredSkill === skill;
                          return (
                            <g key={skill}>
                              <motion.path
                                initial={false}
                                animate={{
                                  opacity: isHighlighted ? 0.85 : 0.2,
                                }}
                                transition={{ duration: 0.3 }}
                                d={`M 300 14 C 300 55, ${targetX} 55, ${targetX} 96`}
                                stroke={activeCategory.accentHex}
                                strokeWidth={hoveredSkill === skill ? "2.4" : "1.3"}
                                fill="none"
                              />
                              <circle
                                cx={targetX}
                                cy={96}
                                r={hoveredSkill === skill ? 5.5 : 3.5}
                                fill={activeCategory.accentHex}
                              />
                            </g>
                          );
                        })}
                        <circle
                          cx="300"
                          cy="14"
                          r="8"
                          fill="#141519"
                          stroke={activeCategory.accentHex}
                          strokeWidth="2.5"
                        />
                      </svg>

                      {/* Interactive Skill Nodes */}
                      <div className="relative z-10 flex flex-wrap gap-2.5">
                        {activeCategory.skills.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onMouseEnter={() => setHoveredSkill(skill)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            onFocus={() => setHoveredSkill(skill)}
                            onBlur={() => setHoveredSkill(null)}
                            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 border ${
                              hoveredSkill === skill
                                ? "bg-[#E86A33] text-[#121316] border-[#F29A4A] font-bold shadow-[0_0_24px_rgba(232,106,51,0.45)] scale-[1.03]"
                                : "bg-[#1A191D] text-[#F5F3F0] border-[#F5F3F0]/16 hover:border-[#E86A33]/65"
                            }`}
                          >
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{
                                backgroundColor:
                                  hoveredSkill === skill
                                    ? "#121316"
                                    : activeCategory.accentHex,
                              }}
                            />
                            <span>{skill}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Connected Systems Reference */}
                    <div className="pt-5 sm:pt-6 border-t border-[#F5F3F0]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2 min-w-0">
                        <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#C8C2BC] block">
                          Applied in Selected Systems
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {activeCategory.relatedProjects.map((proj) => (
                            <span
                              key={proj}
                              className="text-xs sm:text-sm font-semibold text-[#C8C2BC] bg-[#141519]/80 px-3.5 py-1.5 rounded-xl border border-[#F5F3F0]/12"
                            >
                              {proj}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#E86A33] hover:text-[#F29A4A] transition-colors shrink-0"
                      >
                        <span>Explore Projects</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>
        </AppleHeroUnbox>

        {/* ================= EDITORIAL COMPLETE TECHNICAL INDEX ================= */}
        <section className="container" aria-label="Complete Technical Skills Directory">
          <AppleScrollBox mode="unbox-in" className="p-6 sm:p-10 lg:p-14">
            <div className="max-w-3xl mb-8 sm:mb-10">
              <h2 className="display-section text-[#F5F3F0]">Full Technical Index.</h2>
            </div>

            <div className="border-t border-white/10 divide-y divide-white/8">
              {EXPERTISE_DATA.categories.map((category) => (
                <div
                  key={category.id}
                  className="py-6 sm:py-9 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start"
                >
                  <div className="lg:col-span-4">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#D4D1CA]">
                      {category.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-8 flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs sm:text-[13px] px-3.5 sm:px-4 py-2 rounded-xl bg-[#14151A]/90 border border-white/10 text-[#C8C5BF] hover:border-[#E86A33]/50 hover:text-[#F5F3F0] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AppleScrollBox>
        </section>
      </div>
    </PageShell>
  );
};

export default SkillsPage;
