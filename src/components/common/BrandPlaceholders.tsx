import React from "react";
import { BRAND_ASSETS } from "@/data/portfolioData";

interface LogoPlaceholderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Minimal geometric emblem logo / portrait badge.
 */
export const GeometricLogoPlaceholder: React.FC<LogoPlaceholderProps> = ({
  className = "",
  size = "md",
}) => {
  const dimensions =
    size === "sm" ? "w-9 h-9" : size === "lg" ? "w-12 h-12" : "w-10 h-10";

  if (BRAND_ASSETS.logoImageUrl) {
    return (
      <div
        className={`${dimensions} rounded-full bg-[#18181C] border border-[#E86A33]/65 overflow-hidden shrink-0 shadow-[0_0_16px_rgba(232,106,51,0.3)] ${className}`}
      >
        <img
          src={BRAND_ASSETS.logoImageUrl}
          alt="Harshit Singh Shekhawat"
          className="w-full h-full object-cover object-top scale-110"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${dimensions} rounded-xl bg-[#18181C] border border-[#F5F3F0]/18 flex items-center justify-center overflow-hidden shadow-inner group ${className}`}
      aria-label="Harshit Singh Shekhawat emblem"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#E86A33]/20 via-transparent to-[#F29A4A]/15 opacity-75 group-hover:opacity-100 transition-opacity" />
      <svg
        viewBox="0 0 36 36"
        fill="none"
        className="w-5 h-5 relative z-10"
        aria-hidden="true"
      >
        <polygon
          points="18,4 30,11 30,25 18,32 6,25 6,11"
          stroke="#C8C2BC"
          strokeWidth="1.5"
          strokeOpacity="0.65"
          fill="rgba(28, 27, 26, 0.55)"
        />
        <path
          d="M13 12V24M23 12V24M13 18H23"
          stroke="#F5F3F0"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="18" cy="18" r="2" fill="#E86A33" />
      </svg>
    </div>
  );
};

interface ProfilePhotoPlaceholderProps {
  size?: "nav" | "card" | "hero";
  className?: string;
  showBadge?: boolean;
}

/**
 * Renders Harshit Singh Shekhawat's actual portrait photograph
 * with a tailored warm charcoal & burnt-orange studio frame.
 */
export const ProfilePhotoPlaceholder: React.FC<ProfilePhotoPlaceholderProps> = ({
  size = "card",
  className = "",
}) => {
  const photoSrc = BRAND_ASSETS.profilePhotoUrl || "/images/harshit-profile.png";

  if (size === "nav") {
    return (
      <div
        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#18181C] border border-[#E86A33]/65 flex items-center justify-center overflow-hidden relative shadow-[0_0_14px_rgba(232,106,51,0.3)] shrink-0 ${className}`}
        title="Harshit Singh Shekhawat"
      >
        <img
          src={photoSrc}
          alt="Harshit Singh Shekhawat"
          className="w-full h-full object-cover object-top scale-110"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl surface-graphite border border-[#F5F3F0]/14 p-5 sm:p-6 flex items-center gap-4 sm:gap-5 shadow-xl ${className}`}
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#141518] border border-[#E86A33]/45 overflow-hidden shrink-0 shadow-[0_0_25px_rgba(232,106,51,0.22)]">
        <img
          src={photoSrc}
          alt="Harshit Singh Shekhawat"
          className="w-full h-full object-cover object-top"
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="min-w-0">
        <span className="inline-block text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[#E86A33] mb-1">
          AI / ML Engineer
        </span>
        <p className="font-heading text-lg sm:text-xl font-extrabold text-[#F5F3F0] truncate">
          Harshit Singh Shekhawat
        </p>
        <p className="text-sm sm:text-[15px] text-[#B8B3AD] mt-0.5">
          B.Tech CSE (AI &amp; ML) · VIT Chennai
        </p>
      </div>
    </div>
  );
};
