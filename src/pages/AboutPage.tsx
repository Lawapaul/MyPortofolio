import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Network,
  Layers,
  Eye,
  MessageSquareCode,
  Code2,
  ArrowUpRight,
} from "lucide-react";
import { ABOUT_DATA, EDUCATION_DATA } from "@/data/portfolioData";
import { PageShell } from "@/components/common/PageShell";
import { ProfilePhotoPlaceholder } from "@/components/common/BrandPlaceholders";
import { MascotScene } from "@/components/three/MascotScene";
import { AppleHeroUnbox, AppleScrollBox } from "@/components/common/AppleUnboxStage";

const AREA_ICONS = [Brain, Eye, Layers, Network, Code2, MessageSquareCode];

const AboutPage: React.FC = () => {
  const [activeInterestIndex, setActiveInterestIndex] = useState<number>(0);

  const snapshotItems = [
    {
      label: "Degree & Branch",
      value: `${ABOUT_DATA.academicSnapshot.degree} — ${ABOUT_DATA.academicSnapshot.branch}`,
      highlight: false,
    },
    {
      label: "Specialization",
      value: ABOUT_DATA.academicSnapshot.specialization,
      highlight: false,
    },
    {
      label: "Current CGPA",
      value: ABOUT_DATA.academicSnapshot.cgpa,
      highlight: true,
    },
  ];

  return (
    <PageShell
      variant="about-editorial"
      title="About | Harshit Singh Shekhawat — AI / ML Engineer"
    >
      <div className="space-y-10 sm:space-y-14 md:space-y-16 pb-12 sm:pb-16">
        {/* ================= SECTION 1: EDITORIAL NARRATIVE & 3D COMPANION ================= */}
        <AppleHeroUnbox frameLabel="Harshit Singh Shekhawat · Personal Engineering Profile">
          <section className="container pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
              {/* Editorial Narrative Column (Title + Paragraphs) */}
              <div className="lg:col-span-7 min-w-0 space-y-6 sm:space-y-8">
                <h1 className="display-section text-[#F5F3F0]">{ABOUT_DATA.heading}</h1>

                <p className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5F3F0] leading-[1.42] tracking-tight text-justify">
                  {ABOUT_DATA.paragraphs[0]}
                </p>

                <div className="w-16 h-1 rounded-full bg-[#E86A33]" />

                <div className="space-y-5">
                  {ABOUT_DATA.paragraphs.slice(1).map((paragraph, index) => (
                    <p key={index} className="body-large text-[#C8C5BF] text-justify font-sans font-normal">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Supporting 3D Companion & Portrait Frame (Parallel to "More than just code." title) */}
              <div className="lg:col-span-5 min-w-0 w-full space-y-5 sm:space-y-6">
                <div
                  style={{
                    backdropFilter: "blur(20px) saturate(175%)",
                    WebkitBackdropFilter: "blur(20px) saturate(175%)",
                  }}
                  className="rounded-[2rem] bg-[#121318]/80 border border-white/10 p-3 sm:p-5 overflow-hidden shadow-2xl"
                >
                  <MascotScene variant="companion" />
                </div>

                <ProfilePhotoPlaceholder size="card" />
              </div>
            </div>
          </section>
        </AppleHeroUnbox>

        {/* ================= SECTION 2: ACADEMIC SNAPSHOT MONUMENT STRIP ================= */}
        <section className="container" aria-label="Academic Snapshot">
          <AppleScrollBox mode="unbox-in" className="p-6 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
              {snapshotItems.map((item, idx) => (
                <div
                  key={item.label}
                  className={`${
                    idx > 0 ? "pt-5 sm:pt-0 lg:pl-8" : ""
                  } flex flex-col justify-between space-y-2.5`}
                >
                  <span className="font-mono text-xs sm:text-[13px] font-medium uppercase tracking-wider text-[#9C9890]">
                    {item.label}
                  </span>
                  <p
                    className={`font-heading font-extrabold tracking-tight ${
                      item.highlight
                        ? "text-[#E86A33] text-2xl sm:text-4xl lg:text-5xl"
                        : "text-[#F5F3F0] text-lg sm:text-xl lg:text-2xl"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-2xl surface-graphite border border-white/10 p-5 sm:p-7 space-y-2">
                <span className="font-mono text-xs sm:text-[13px] font-medium uppercase tracking-wider text-[#9C9890]">
                  College
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5F3F0]">
                  {ABOUT_DATA.academicSnapshot.university}
                </h3>
                <p className="text-sm text-[#C8C5BF]">
                  {ABOUT_DATA.academicSnapshot.degree} · {ABOUT_DATA.academicSnapshot.branch}
                </p>
              </div>
              <div className="rounded-2xl surface-graphite border border-white/10 p-5 sm:p-7 space-y-2">
                <span className="font-mono text-xs sm:text-[13px] font-medium uppercase tracking-wider text-[#9C9890]">
                  School
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5F3F0]">
                  {EDUCATION_DATA.schooling.school}
                </h3>
                <p className="text-sm text-[#C8C5BF]">
                  {EDUCATION_DATA.schooling.credentials} · {EDUCATION_DATA.schooling.completion}
                </p>
              </div>
            </div>
          </AppleScrollBox>
        </section>

        {/* ================= SECTION 3: INTERACTIVE AREAS OF INTEREST ================= */}
        <section className="container">
          <AppleScrollBox mode="unbox-in" className="p-6 sm:p-10 lg:p-14">
            <div className="max-w-3xl mb-8 sm:mb-12">
              <h2 className="display-section">Areas of Interest.</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 xl:gap-12 items-stretch">
              {/* Left Column: Interactive Domain Selector */}
              <div
                className="lg:col-span-6 flex flex-col gap-3"
                role="tablist"
                aria-label="Areas of Interest"
              >
                {ABOUT_DATA.areasOfInterest.map((area, idx) => {
                  const Icon = AREA_ICONS[idx % AREA_ICONS.length];
                  const isSelected = activeInterestIndex === idx;
                  return (
                    <button
                      key={area.title}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveInterestIndex(idx)}
                      onMouseEnter={() => setActiveInterestIndex(idx)}
                      className={`w-full text-left rounded-2xl p-4 sm:p-6 transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 border ${
                        isSelected
                          ? "surface-metallic border-[#E86A33]/70 shadow-[0_20px_50px_-15px_rgba(232,106,51,0.3)]"
                          : "surface-graphite border-[#F5F3F0]/12 hover:border-[#E86A33]/40"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                        <div
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                            isSelected
                              ? "bg-[#E86A33] text-[#121316]"
                              : "bg-[#141519]/90 text-[#E86A33] border border-[#F5F3F0]/14"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-[#F5F3F0] leading-snug">
                          {area.title}
                        </h3>
                      </div>

                      <ArrowUpRight
                        className={`w-5 h-5 transition-transform duration-300 shrink-0 ${
                          isSelected
                            ? "text-[#E86A33] translate-x-0.5 -translate-y-0.5"
                            : "text-[#C8C2BC]/50"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Active Focus Stage */}
              <div className="lg:col-span-6">
                <AnimatePresence mode="wait" initial={false}>
                  {(() => {
                    const activeArea = ABOUT_DATA.areasOfInterest[activeInterestIndex];
                    const ActiveIcon = AREA_ICONS[activeInterestIndex % AREA_ICONS.length];
                    return (
                      <motion.div
                        key={activeArea.title}
                        initial={{ opacity: 0.9, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-3xl surface-glass border border-[#E86A33]/30 p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden"
                      >
                        <div className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#E86A33]/16 blur-3xl" />

                        <div className="space-y-6 sm:space-y-8 relative z-10">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E86A33]/18 border border-[#E86A33]/45 flex items-center justify-center text-[#E86A33]">
                            <ActiveIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                          </div>

                          <div className="space-y-3 sm:space-y-4">
                            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F3F0] tracking-tight">
                              {activeArea.title}
                            </h3>
                            <p className="body-large text-[#C4BFB9]">
                              {activeArea.focus}
                            </p>
                          </div>

                          <div className="pt-2 sm:pt-4">
                            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#C8C2BC] block mb-3">
                              Connected Engineering Domains
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {activeArea.connections.map((conn) => (
                                <span
                                  key={conn}
                                  className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold bg-[#141519]/90 border border-[#E86A33]/35 text-[#F5F3F0]"
                                >
                                  {conn}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#F5F3F0]/12 flex items-center justify-between relative z-10">
                          <span className="text-xs sm:text-sm font-semibold text-[#C8C2BC]">
                            Core Engineering Focus
                          </span>
                          <div className="flex gap-1.5">
                            {ABOUT_DATA.areasOfInterest.map((_, i) => (
                              <span
                                key={i}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  i === activeInterestIndex
                                    ? "w-7 bg-[#E86A33]"
                                    : "w-2 bg-[#F5F3F0]/22"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>
          </AppleScrollBox>
        </section>

        {/* ================= SECTION 4: ENGINEERING PHILOSOPHY ================= */}
        <section className="container">
          <AppleScrollBox mode="unbox-in" className="p-6 sm:p-10 lg:p-14">
            <div className="max-w-4xl space-y-5 sm:space-y-6">
              <div className="w-14 h-1.5 rounded-full bg-gradient-to-r from-[#E86A33] to-[#F29A4A]" />
              <h2 className="display-section">
                {ABOUT_DATA.engineeringPhilosophy.heading}
              </h2>
              <p className="body-large text-[#C4BFB9] max-w-3xl">
                {ABOUT_DATA.engineeringPhilosophy.text}
              </p>
            </div>
          </AppleScrollBox>
        </section>
      </div>
    </PageShell>
  );
};

export default AboutPage;
