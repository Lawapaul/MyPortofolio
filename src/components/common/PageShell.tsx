import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { FooterV2 } from "./FooterV2";

export type PageSurfaceVariant =
  | "home"
  | "about-editorial"
  | "projects-gallery"
  | "expertise-ecosystem"
  | "profiles-nexus"
  | "education-chronicle"
  | "contact-terminal";

interface PageShellProps {
  children: React.ReactNode;
  variant: PageSurfaceVariant;
  title: string;
  hideFooter?: boolean;
}

let previousPathname: string | null = null;

export const PageShell: React.FC<PageShellProps> = ({
  children,
  title,
  hideFooter = false,
}) => {
  const location = useLocation();
  const isProjectFocusMode =
    (location.pathname === "/projects" || location.pathname === "/") &&
    new URLSearchParams(location.search).has("project");
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(true);

  const isPageSwitch =
    previousPathname !== null && previousPathname !== location.pathname;
  const [cloudStage, setCloudStage] = useState<"mist" | "clearing" | "done">(
    isPageSwitch ? "mist" : "done"
  );

  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.title = title;

    const switched =
      previousPathname !== null && previousPathname !== location.pathname;
    previousPathname = location.pathname;

    if (!switched) {
      setCloudStage("done");
      return;
    }

    setCloudStage("mist");

    const t1 = window.setTimeout(() => {
      setCloudStage("clearing");
    }, 16);

    const t2 = window.setTimeout(() => {
      setCloudStage("done");
    }, 240);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [location.pathname, title]);

  useEffect(() => {
    const updateScrollCue = () => {
      const pageCanScroll =
        document.documentElement.scrollHeight > window.innerHeight + 120;
      setShowScrollCue(pageCanScroll && window.scrollY < 90);
    };
    updateScrollCue();
    window.addEventListener("scroll", updateScrollCue, { passive: true });
    window.addEventListener("resize", updateScrollCue, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollCue);
      window.removeEventListener("resize", updateScrollCue);
    };
  }, [location.pathname]);

  // Zero-React-Rerender Direct DOM Cursor Ring & Glow Tracking for Instant 60fps Responsiveness
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const enabled = mq.matches && !rm.matches;
    setIsDesktopPointer(enabled);
    if (!enabled) return;

    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let rafId = 0;
    let lastInteractive = false;

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      targetX = e.clientX;
      targetY = e.clientY;

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(520px circle at ${targetX}px ${targetY}px, rgba(232, 106, 51, 0.065), transparent 65%)`;
      }

      const targetEl = e.target as HTMLElement | null;
      const interactive = Boolean(
        targetEl?.closest("a, button, [role='button'], [role='tab'], input, textarea")
      );
      if (interactive !== lastInteractive && ringInnerRef.current) {
        lastInteractive = interactive;
        ringInnerRef.current.className = interactive
          ? "rounded-full border transition-all duration-200 w-11 h-11 border-[#E86A33]/75 bg-[#E86A33]/12 scale-110"
          : "rounded-full border transition-all duration-200 w-8 h-8 border-[#F5F3F0]/22 bg-transparent scale-100";
      }
    };

    const animateRing = () => {
      currentX += (targetX - currentX) * 0.24;
      currentY += (targetY - currentY) * 0.24;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    rafId = requestAnimationFrame(animateRing);
    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative z-10 text-[#F5F3F0] selection:bg-[#E86A33]/30 selection:text-[#F5F3F0] overflow-x-clip">
      {/* Subtle Atmospheric Cloud Mist Veil on Page Switch (220ms, zero lag, preserves background video) */}
      {cloudStage !== "done" && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed inset-0 z-[70] transition-opacity duration-200 ease-out ${
            cloudStage === "mist" ? "opacity-45" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle at 50% 35%, rgba(245, 243, 240, 0.28) 0%, rgba(232, 106, 51, 0.14) 52%, rgba(18, 19, 22, 0.25) 100%)",
          }}
        />
      )}

      {/* Desktop Ambient Cursor Glow + Precision Trailing Ring (Direct DOM updates, 0 React re-renders) */}
      {isDesktopPointer && (
        <>
          <div
            ref={glowRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-30"
          />
          <div
            ref={ringRef}
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-50 -ml-4 -mt-4 hidden lg:flex items-center justify-center"
          >
            <div
              ref={ringInnerRef}
              className="rounded-full border transition-all duration-200 w-8 h-8 border-[#F5F3F0]/22 bg-transparent scale-100"
            />
          </div>
        </>
      )}

      {/* Page Content */}
      <main key={location.pathname} className="flex-1 relative z-10 animate-cloud-unbox">
        {children}
      </main>

      {!isProjectFocusMode && <button
        type="button"
        aria-label="Scroll down to explore this page"
        onClick={() => window.scrollBy({ top: Math.round(window.innerHeight * 0.78), behavior: "smooth" })}
        className={`scroll-cue fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:bottom-auto sm:top-[5.75rem] left-1/2 -translate-x-1/2 z-40 inline-flex max-w-[calc(100vw-2rem)] items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-[#101116]/90 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[8px] sm:text-[11px] font-semibold tracking-[0.1em] sm:tracking-[0.22em] text-[#D8D5D0] shadow-[0_8px_28px_rgba(0,0,0,0.42)] backdrop-blur-md transition-all duration-300 hover:border-[#E86A33]/55 hover:text-white ${showScrollCue ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"}`}
      >
        <span>SCROLL TO EXPLORE</span>
        <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#F29A4A]" />
      </button>}

      {!hideFooter && <FooterV2 />}
    </div>
  );
};
