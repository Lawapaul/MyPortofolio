import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/data/portfolioData";
import { ProfilePhotoPlaceholder } from "@/components/common/BrandPlaceholders";
import { ResumeDropdown } from "./ResumeDropdown";
import { NavbarMusicToggle } from "@/components/common/BackgroundMusicPlayer";

/**
 * Responsive Expanding Capsule Navigation Bar:
 * - Desktop (`lg+`): Expands HORIZONTALLY on the same single line.
 * - Smaller resolution devices (`< lg`, iPhone / iPad Portrait / Mobile): Expands VERTICALLY downward.
 * - Automatically closes when navigating to a new page, pressing Escape, or clicking outside.
 */
export const NavbarV2: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const isProjectFocusMode =
    (location.pathname === "/projects" || location.pathname === "/") &&
    new URLSearchParams(location.search).has("project");
  const navContainerRef = useRef<HTMLElement>(null);

  // Close menubar automatically when navigating to a new page
  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on Escape or outside click
  useEffect(() => {
    if (!expanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(false);
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, {
      passive: true,
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [expanded]);

  return (
    <header
      className={`${isProjectFocusMode ? "hidden" : ""} fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2.5 sm:py-3" : "py-3.5 sm:py-5"
      }`}
    >
      <div className="container px-2.5 sm:px-6 lg:px-8 flex justify-center">
        <motion.nav
          ref={navContainerRef}
          layout
          transition={{
            layout: {
              type: "spring",
              stiffness: 360,
              damping: 32,
              mass: 0.8,
            },
          }}
          aria-label="Primary Navigation"
          style={{
            backdropFilter: "blur(24px) saturate(185%)",
            WebkitBackdropFilter: "blur(24px) saturate(185%)",
          }}
          className={`relative flex flex-col justify-center px-2.5 sm:px-4 py-2 sm:py-2.5 transition-colors duration-300 max-w-full ${
            expanded
              ? "w-full max-w-[540px] lg:max-w-[1320px] rounded-[1.75rem] lg:rounded-full bg-[#0D0E13]/92 border border-[#E86A33]/45 shadow-[0_24px_70px_rgba(0,0,0,0.92),inset_0_1px_1px_rgba(255,255,255,0.18)]"
              : scrolled
              ? "w-auto rounded-full bg-[#0D0E13]/82 border border-[#F5F3F0]/18 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.16)]"
              : "w-auto rounded-full bg-[#0D0E13]/75 border border-[#F5F3F0]/16 shadow-[0_18px_45px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.16)]"
          }`}
        >
          {/* TOP BAR ROW */}
          <div className="flex items-center justify-between gap-2 sm:gap-3 w-full">
            {/* LEFT: [≡ MENU] Button + Brand Identity */}
            <motion.div
              layout="position"
              className="flex items-center gap-1.5 sm:gap-3 shrink-0"
            >
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                aria-controls="inline-navigation-links"
                aria-label={
                  expanded ? "Close navigation menu" : "Open navigation menu"
                }
                className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-heading font-semibold text-[10.5px] sm:text-[13px] uppercase tracking-[0.1em] transition-all duration-300 border shrink-0 bg-[#14151A]/90 hover:bg-[#181920] border-white/10 hover:border-[#E86A33]/50 text-[#F5F3F0] shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
              >
                {expanded ? (
                  <X className="w-3 h-3 sm:w-4 sm:h-4 text-[#E86A33] stroke-[2.4]" />
                ) : (
                  <Menu className="w-3 h-3 sm:w-4 sm:h-4 text-[#E86A33]" />
                )}
                <span>Menu</span>
              </button>

              {/* Profile Photo + Name */}
              <Link
                to="/"
                onClick={() => setExpanded(false)}
                className="flex items-center gap-1.5 sm:gap-2.5 group focus:outline-none shrink-0"
                aria-label="Harshit Singh Shekhawat — Home"
              >
                <ProfilePhotoPlaceholder size="nav" />
                <span
                  className={`font-heading font-bold tracking-tight text-[#F5F3F0] group-hover:text-white transition-colors whitespace-nowrap text-[14.5px] md:text-[16px] px-1 ${
                    expanded ? "hidden sm:inline lg:hidden" : "hidden sm:inline"
                  }`}
                >
                  Harshit Singh Shekhawat
                </span>
                <span className="inline sm:hidden font-heading font-bold text-[12px] xs:text-[13px] tracking-tight text-[#F5F3F0] whitespace-nowrap">
                  Harshit S.
                </span>
              </Link>
            </motion.div>

            {/* CENTER (DESKTOP `lg+` ONLY): INLINE HORIZONTAL NAVIGATION LINKS */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id="inline-navigation-links"
                  initial={{ opacity: 0, width: 0, scale: 0.96 }}
                  animate={{ opacity: 1, width: "auto", scale: 1 }}
                  exit={{ opacity: 0, width: 0, scale: 0.96 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-2 overflow-x-auto no-scrollbar py-0.5 px-1 min-w-0 flex-1"
                >
                  {NAVIGATION_ITEMS.map((item, idx) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{
                        duration: 0.18,
                        delay: idx * 0.02,
                      }}
                      className="shrink-0"
                    >
                      <Link
                        to={item.path}
                        onClick={() => setExpanded(false)}
                        className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-heading text-[14px] font-semibold tracking-wide transition-all duration-200 whitespace-nowrap text-[#C8C5BF] hover:text-[#F5F3F0] hover:bg-[#1C1E26]/90 border border-transparent hover:border-white/10"
                      >
                        <span>{item.navLabel}</span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* RIGHT: Play Music + Resume Controls */}
            <motion.div
              layout="position"
              className="flex items-center gap-1.5 sm:gap-2 shrink-0"
            >
              <NavbarMusicToggle compact />
              <ResumeDropdown
                compact
                onActionComplete={() => setExpanded(false)}
              />
            </motion.div>
          </div>

          {/* SMALLER RESOLUTION DEVICES (`< lg`): VERTICAL EXPANDING MENU PANEL */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id="mobile-vertical-navigation-links"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden overflow-hidden w-full"
              >
                <div className="pt-3 pb-1.5 mt-2.5 border-t border-white/12 flex flex-col gap-1">
                  {NAVIGATION_ITEMS.map((item, idx) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{
                        duration: 0.18,
                        delay: idx * 0.025,
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setExpanded(false)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl font-heading text-sm sm:text-base font-semibold text-[#C8C5BF] hover:text-[#F5F3F0] hover:bg-[#1C1E26]/90 border border-transparent hover:border-white/10 transition-all"
                      >
                        <span>{item.navLabel}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#E86A33]" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </header>
  );
};
