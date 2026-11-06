import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

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

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-7 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-[1.4rem] border border-[#E86A33]/35 bg-[#15161B]/85 p-2 shadow-[0_16px_60px_rgba(232,106,51,0.16)] sm:mb-9 sm:h-20 sm:w-20 sm:rounded-[1.65rem]"
        >
          <img src="/favicon.svg" alt="HSS" className="h-full w-full rounded-[1rem]" />
          <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full border border-[#F29A4A]/35 bg-[#171419] text-[#F29A4A] shadow-lg">
            <Sparkles aria-hidden="true" className="h-3 w-3" />
          </span>
        </motion.div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.08 }}
          className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#F29A4A] sm:text-xs sm:tracking-[0.34em]"
        >
          Harshit Singh Shekhawat
        </motion.p>

        <motion.h1
          id="site-intro-title"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.14 }}
          className="font-heading text-[clamp(2.1rem,8.4vw,4.25rem)] font-extrabold leading-[0.98] tracking-[-0.055em]"
        >
          Building ideas into <span className="text-[#E86A33]">systems.</span>
        </motion.h1>

        <p className="mt-4 max-w-[35ch] text-sm leading-6 text-[#C8C2BC] sm:mt-5 sm:text-base sm:leading-7">
          Artificial intelligence, machine learning, and thoughtful engineering.
        </p>

        <div className="mt-9 w-full max-w-[15rem] sm:mt-11 sm:max-w-[17rem]">
          <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0 : 3, ease: "linear" }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-[#E86A33] via-[#F29A4A] to-[#FFD08C]"
            />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={ready ? "ready" : "loading"}
              id="site-intro-status"
              aria-live="polite"
              initial={reduceMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              className="mt-3 min-h-5 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[#A9A39D] sm:text-[10px]"
            >
              {ready ? "Your experience is ready" : "Preparing your experience"}
            </motion.p>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {ready && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
              className="mt-7 sm:mt-8"
            >
              <button
                ref={enterButtonRef}
                type="button"
                onClick={onEnter}
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#F29A4A]/55 bg-gradient-to-r from-[#E86A33] to-[#F29A4A] px-7 py-3 text-sm font-bold text-[#111116] shadow-[0_12px_36px_rgba(232,106,51,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(232,106,51,0.36)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD08C] focus-visible:ring-offset-4 focus-visible:ring-offset-[#090A0E] sm:min-h-14 sm:px-9 sm:text-base"
              >
                <span>Enter Portfolio</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="mt-3 hidden font-mono text-[9px] uppercase tracking-[0.2em] text-[#8F8983] sm:block">
                Press Enter to continue
              </p>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[#8F8983] sm:hidden">
                Tap to continue
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
