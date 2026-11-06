import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ExternalLink, Download, ChevronDown } from "lucide-react";
import { RESUME_CONFIG } from "@/data/portfolioData";

interface ResumeDropdownProps {
  mobile?: boolean;
  compact?: boolean;
  onActionComplete?: () => void;
}

export const ResumeDropdown: React.FC<ResumeDropdownProps> = ({
  mobile = false,
  compact = false,
  onActionComplete,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (mobile) {
    return (
      <div className="w-full pt-4 border-t border-[#F5F3F0]/12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <a
            href={RESUME_CONFIG.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onActionComplete}
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-[#1C1B1E] hover:bg-[#262428] border border-[#F5F3F0]/16 hover:border-[#E86A33]/60 text-[#F5F3F0] text-sm sm:text-base font-bold transition-all"
          >
            <ExternalLink className="w-4 h-4 text-[#E86A33]" />
            <span>View Online</span>
          </a>
          <a
            href={RESUME_CONFIG.filePath}
            download={RESUME_CONFIG.downloadFileName}
            onClick={onActionComplete}
            className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-[#E86A33] hover:bg-[#F29A4A] text-[#121316] text-sm sm:text-base font-bold transition-all shadow-[0_10px_28px_-10px_rgba(232,106,51,0.6)]"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open resume options"
        className={`inline-flex items-center gap-1 sm:gap-2 rounded-full bg-[#1C1B1E]/85 hover:bg-[#262428]/90 border transition-all duration-300 font-heading font-semibold text-[#F5F3F0] ${
          open
            ? "border-[#E86A33]/80 shadow-[0_0_24px_rgba(232,106,51,0.28)]"
            : "border-[#F5F3F0]/18 hover:border-[#E86A33]/55"
        } ${
          compact
            ? "px-2 sm:px-3.5 py-1 sm:py-2 text-[10.5px] sm:text-[13.5px]"
            : "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[14px]"
        }`}
      >
        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E86A33] shrink-0" />
        <span className="max-[360px]:hidden">Resume</span>
        <ChevronDown
          className={`w-3.5 h-3.5 max-[360px]:hidden text-[#C8C2BC] transition-transform duration-200 shrink-0 ${
            open ? "rotate-180 text-[#E86A33]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Resume actions"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 mt-2.5 w-[min(15.5rem,calc(100vw-2rem))] rounded-2xl bg-[#16161A]/95 backdrop-blur-2xl border border-[#E86A33]/35 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.85)] z-[80]"
          >
            <a
              role="menuitem"
              href={RESUME_CONFIG.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setOpen(false);
                onActionComplete?.();
              }}
              className="flex items-center justify-between w-full px-3.5 py-3 rounded-xl text-sm sm:text-[15px] font-semibold text-[#F5F3F0] hover:bg-[#E86A33]/18 transition-colors group"
            >
              <span>View Online</span>
              <ExternalLink className="w-4 h-4 text-[#C8C2BC] group-hover:text-[#E86A33] transition-colors" />
            </a>

            <a
              role="menuitem"
              href={RESUME_CONFIG.filePath}
              download={RESUME_CONFIG.downloadFileName}
              onClick={() => {
                setOpen(false);
                onActionComplete?.();
              }}
              className="flex items-center justify-between w-full px-3.5 py-3 rounded-xl text-sm sm:text-[15px] font-semibold text-[#F5F3F0] hover:bg-[#E86A33]/18 transition-colors group mt-1"
            >
              <span>Download PDF</span>
              <Download className="w-4 h-4 text-[#C8C2BC] group-hover:text-[#E86A33] transition-colors" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
