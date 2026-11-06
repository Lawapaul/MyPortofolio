import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Linkedin,
  Code2,
  Terminal,
  Award,
  ArrowUpRight,
  Link2,
} from "lucide-react";
import { PROFILES_DATA, CodingProfileItem } from "@/data/portfolioData";
import { PageShell } from "@/components/common/PageShell";
import { AppleHeroUnbox, AppleScrollBox } from "@/components/common/AppleUnboxStage";

const getPlatformIcon = (id: string) => {
  switch (id) {
    case "github":
      return Github;
    case "linkedin":
      return Linkedin;
    case "leetcode":
      return Terminal;
    case "geeksforgeeks":
      return Code2;
    default:
      return Award;
  }
};

const ProfileTiltCard: React.FC<{
  profile: CodingProfileItem;
  liveGfgSolved?: number | null;
}> = ({ profile, liveGfgSolved }) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const Icon = getPlatformIcon(profile.id);

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: -(py - 0.5) * 4.5,
      ry: (px - 0.5) * 4.5,
    });
  };

  const cleanUrl = profile.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition:
          tilt.rx === 0 && tilt.ry === 0
            ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
            : "transform 0.08s linear",
      }}
      className="group relative w-full max-w-full rounded-[1.75rem] sm:rounded-[2rem] surface-graphite surface-interactive p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-[#F5F3F0]/14 overflow-hidden"
    >
      <div className="space-y-5 sm:space-y-6 min-w-0">
        {/* Card Header: Platform Icon + Name/Username + Contained Action Arrow */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 min-w-0">
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#141519] border border-[#E86A33]/35 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(232,106,51,0.15)]"
              style={{ color: profile.accentHex }}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-[#F5F3F0] transition-colors leading-tight break-words">
                {profile.platform}
              </h3>
              <p className="font-mono text-xs sm:text-[14px] font-normal text-[#C8C5BF] mt-0.5 truncate">
                @{profile.username}
              </p>
            </div>
          </div>

          <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#141519]/90 border border-white/10 flex items-center justify-center text-[#C8C5BF] group-hover:text-[#101114] group-hover:bg-[#E86A33] group-hover:border-[#E86A33] transition-all shrink-0">
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
        </div>

        {/* Role Label — JetBrains Mono */}
        <p
          className="font-mono text-xs sm:text-[12px] font-medium uppercase tracking-[0.12em] text-[#9C9890] break-words"
        >
          {profile.roleLabel}
        </p>

        {/* Description — DM Sans */}
        <p className="body-standard text-[#C8C5BF] font-sans font-normal leading-[1.72]">{profile.description}</p>

        {/* Live GeeksforGeeks stat only when verified live function responds */}
        {profile.id === "geeksforgeeks" && typeof liveGfgSolved === "number" && (
          <div className="rounded-2xl bg-[#141519]/85 border border-white/10 p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-xs font-medium uppercase tracking-wider text-[#9C9890]">
                Live Verified Metric
              </p>
              <p className="text-sm text-[#F5F3F0] mt-0.5 truncate font-medium">
                Problems Solved on GeeksforGeeks
              </p>
            </div>
            <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#E86A33] shrink-0">
              {liveGfgSolved}
            </span>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-5 mt-6 sm:mt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Link2 className="w-4 h-4 text-[#E86A33] shrink-0" />
          <span className="font-mono text-xs sm:text-sm font-normal text-[#C8C5BF] truncate">
            {cleanUrl}
          </span>
        </div>

        <span className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#E86A33] group-hover:bg-[#F29A4A] text-xs sm:text-sm font-heading font-semibold text-[#101114] transition-all shrink-0 self-start sm:self-auto shadow-[0_8px_20px_-6px_rgba(232,106,51,0.4)]">
          <span>Open Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
};

const ProfilesPage: React.FC = () => {
  const [liveGfgSolved, setLiveGfgSolved] = useState<number | null>(null);
  const [codolioTilt, setCodolioTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const controller = new AbortController();
    const fetchLiveGfg = async () => {
      try {
        const res = await fetch("/.netlify/functions/gfg-stats", {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) return;
        const data = (await res.json()) as { totalProblemsSolved?: number };
        if (typeof data.totalProblemsSolved === "number") {
          setLiveGfgSolved(data.totalProblemsSolved);
        }
      } catch {
        // Clean fallback when running locally without serverless function proxy
      }
    };
    fetchLiveGfg();
    return () => controller.abort();
  }, []);

  const handleCodolioMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setCodolioTilt({
      rx: -(py - 0.5) * 4,
      ry: (px - 0.5) * 4,
    });
  };

  const codolio = PROFILES_DATA.codolioPrimary;

  return (
    <PageShell
      variant="profiles-nexus"
      title="Profiles & Achievements | Harshit Singh Shekhawat — AI / ML Engineer"
    >
      <div className="space-y-10 sm:space-y-14 pb-12 sm:pb-16">
        <AppleHeroUnbox frameLabel="Competitive Programming & Development Profiles">
          <section className="container pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
            <div className="max-w-4xl mb-10 md:mb-14">
              <h1 className="display-section">{PROFILES_DATA.heading}</h1>

              <p className="mt-5 sm:mt-6 body-large max-w-[60ch]">
                {PROFILES_DATA.introduction}
              </p>
            </div>

            {/* ================= PRIMARY CODOLIO FEATURE MONUMENT ================= */}
            <motion.div
              initial={false}
              onPointerMove={handleCodolioMove}
              onPointerLeave={() => setCodolioTilt({ rx: 0, ry: 0 })}
              style={{
                transform: `perspective(1200px) rotateX(${codolioTilt.rx}deg) rotateY(${codolioTilt.ry}deg)`,
                transition:
                  codolioTilt.rx === 0 && codolioTilt.ry === 0
                    ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
                    : "transform 0.08s linear",
              }}
              className="rounded-[2rem] sm:rounded-[2.5rem] surface-metallic border border-[#E86A33]/45 p-6 sm:p-10 lg:p-14 shadow-[0_28px_80px_-20px_rgba(232,106,51,0.28)] relative overflow-hidden"
            >
              <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#E86A33]/15 blur-3xl pointer-events-none" />
              <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-[#F29A4A]/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-10">
                <div className="space-y-5 sm:space-y-6 max-w-2xl min-w-0">
                  <div className="inline-flex w-fit max-w-full min-w-0 items-start gap-2 px-3 py-1.5 sm:px-4 rounded-2xl bg-[#E86A33]/15 border border-[#E86A33]/45 text-[10px] leading-snug sm:text-[13px] font-bold text-[#F29A4A]">
                    <span className="w-2 h-2 rounded-full bg-[#E86A33] shrink-0" />
                    <span className="min-w-0 whitespace-normal break-words tracking-[0.06em] sm:tracking-[0.12em]">{codolio.roleLabel}</span>
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F5F3F0] break-words">
                      {codolio.platform}{" "}
                      <span className="text-[#E86A33] font-semibold">
                        @{codolio.username}
                      </span>
                    </h2>
                    <p className="body-large text-[#C4BFB9]">
                      {codolio.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#C8C2BC] min-w-0">
                    <Link2 className="w-4 h-4 text-[#E86A33] shrink-0" />
                    <span className="truncate">codolio.com/profile/surferw96</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <a
                    href={codolio.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#E86A33] hover:bg-[#F29A4A] text-[#121316] font-heading font-bold text-sm sm:text-[16px] transition-all shadow-[0_14px_38px_-8px_rgba(232,106,51,0.55)] w-full sm:w-auto"
                  >
                    <span>Visit Codolio (@surferw96)</span>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              </div>
            </motion.div>
          </section>
        </AppleHeroUnbox>

        {/* ================= 4 PLATFORM CARDS ================= */}
        <section className="container">
          <AppleScrollBox mode="unbox-in" className="p-4 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 xl:gap-10">
              {PROFILES_DATA.profiles.map((profile) => (
                <ProfileTiltCard
                  key={profile.id}
                  profile={profile}
                  liveGfgSolved={liveGfgSolved}
                />
              ))}
            </div>
          </AppleScrollBox>
        </section>
      </div>
    </PageShell>
  );
};

export default ProfilesPage;
