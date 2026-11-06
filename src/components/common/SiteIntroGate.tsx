import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SiteIntroGateProps {
  ready: boolean;
  onEnter: () => void;
}

export const SiteIntroGate: React.FC<SiteIntroGateProps> = ({ ready, onEnter }) => {
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (ready) enterButtonRef.current?.focus({ preventScroll: true });
  }, [ready]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || !ready || event.repeat) return;
      event.preventDefault();
      onEnter();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onEnter, ready]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-intro-title"
      aria-describedby="site-intro-status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
      className="fixed inset-0 z-[100] grid min-h-[100svh] place-items-center overflow-x-hidden overflow-y-auto overscroll-contain bg-[#090A0E] px-5 py-8 text-center text-[#F5F3F0]"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[42%] h-[min(82vw,42rem)] w-[min(82vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E86A33]/10 blur-[100px]" />
        <div className="absolute inset-x-0 bottom-0 h-[42vh] bg-gradient-to-t from-[#E86A33]/[0.045] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E86A33]/40 to-transparent" />
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* Round Combined Logo of Name & Initials (No Star) */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-full border border-[#E86A33]/45 bg-[#121319]/90 p-1.5 shadow-[0_16px_50px_rgba(232,106,51,0.22)]"
        >
          <img
            src="/favicon.svg"
            alt="Harshit Singh Shekhawat emblem"
            className="h-full w-full rounded-full"
          />
        </motion.div>

        {/* Name Only */}
        <motion.h1
          id="site-intro-title"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : 0.04 }}
          className="font-heading text-center text-[clamp(1.5rem,5.5vw,2.35rem)] font-extrabold leading-tight tracking-[-0.035em] text-[#F5F3F0]"
        >
          Harshit Singh Shekhawat
        </motion.h1>

        {/* Fast Loading Bar */}
        <div className="mt-7 w-full max-w-[13rem] sm:mt-8 sm:max-w-[15rem]">
          <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-[#E86A33] via-[#F29A4A] to-[#FFD08C]"
            />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={ready ? "ready" : "loading"}
              id="site-intro-status"
              aria-live="polite"
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="mt-3 min-h-5 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-[#A9A39D] sm:text-[10px]"
            >
              {ready ? "Ready when you are" : "Preparing your experience"}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Action Button: Dive In */}
        <AnimatePresence>
          {ready && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-6 sm:mt-7"
            >
              <button
                ref={enterButtonRef}
                type="button"
                onClick={onEnter}
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#F29A4A]/55 bg-gradient-to-r from-[#E86A33] to-[#F29A4A] px-8 py-3 text-sm font-bold text-[#111116] shadow-[0_12px_36px_rgba(232,106,51,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(232,106,51,0.36)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD08C] focus-visible:ring-offset-4 focus-visible:ring-offset-[#090A0E] sm:min-h-14 sm:px-10 sm:text-base"
              >
                <span>Dive In</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="mt-3 hidden font-mono text-[9px] uppercase tracking-[0.2em] text-[#8F8983] sm:block">
                Press Enter to dive in
              </p>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#8F8983] sm:hidden">
                Tap to dive in
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
