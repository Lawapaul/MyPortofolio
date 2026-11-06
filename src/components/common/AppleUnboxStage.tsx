import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AppleHeroUnboxProps {
  children: React.ReactNode;
  frameLabel?: string;
}

/**
 * Instant Zero-Delay "Liquid Glass" Display Stage (`AppleHeroUnbox`)
 * - Optically clear refractive Liquid Glass so the live glowing wave & dotted particle
 *   background remains sharp and visible from 0ms with zero delayed blur snap.
 * - Multi-layered specular glass rim highlights + scroll-driven liquid light refraction.
 */
export const AppleHeroUnbox: React.FC<AppleHeroUnboxProps> = ({
  children,
  frameLabel = "Harshit Singh Shekhawat · AI & ML Systems Architecture",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const innerContentRef = useRef<HTMLDivElement>(null);
  const bottomCaptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (mq.matches || isMobile || !wrapperRef.current || !boxRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.fromTo(
        boxRef.current,
        {
          scale: 1,
          y: 0,
        },
        {
          scale: 0.93,
          y: -16,
          ease: "none",
        },
        0
      );

      if (sheenRef.current) {
        tl.fromTo(
          sheenRef.current,
          { yPercent: -40, xPercent: -8, opacity: 0.65 },
          { yPercent: 55, xPercent: 8, opacity: 1, ease: "none" },
          0
        );
      }

      if (innerContentRef.current) {
        tl.fromTo(
          innerContentRef.current,
          { scale: 1, y: 0 },
          { scale: 0.975, y: -10, ease: "none" },
          0
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full pt-2 sm:pt-4 px-2 sm:px-4 md:px-6"
    >
      <div
        ref={boxRef}
        style={{
          backdropFilter: "blur(10px) saturate(155%) brightness(104%)",
          WebkitBackdropFilter: "blur(10px) saturate(155%) brightness(104%)",
        }}
        className="relative w-full rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-white/[0.055] via-[#10121A]/35 to-[#090A0F]/50 border border-white/[0.14] overflow-hidden shadow-[0_36px_110px_-20px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.18),inset_0_-1px_2px_rgba(232,106,51,0.08)]"
      >
        {/* Liquid Glass Refractive Specular Highlight Ribbon (Glides smoothly as you scroll) */}
        <div
          ref={sheenRef}
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-16 -top-28 h-80 z-20"
          style={{
            background:
              "radial-gradient(ellipse 75% 50% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(232, 106, 51, 0.065) 42%, transparent 78%)",
          }}
        />

        {/* Sculpted Liquid Glass Edge Rim & Top Sensor Pill */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] shadow-[inset_0_1px_2px_rgba(255,255,255,0.26),inset_0_0_42px_rgba(232,106,51,0.065)]"
        >
          <div className="hidden sm:flex absolute top-3 left-1/2 -translate-x-1/2 w-28 h-2 rounded-full bg-[#0B0C10]/80 border border-white/20 items-center justify-end pr-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E86A33]" />
          </div>
        </div>

        <div ref={innerContentRef} className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>

      {/* Hardware Frame Caption */}
      <div
        ref={bottomCaptionRef}
        className="flex items-center justify-center gap-2.5 pt-4 pb-2 px-4 text-center pointer-events-none"
      >
        <span className="w-2 h-2 rounded-full bg-[#E86A33] shrink-0 shadow-[0_0_10px_#E86A33]" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#C4BFB9] truncate max-w-full">
          {frameLabel}
        </span>
      </div>
    </div>
  );
};

interface AppleScrollBoxProps {
  children: React.ReactNode;
  className?: string;
  mode?: "unbox-out" | "unbox-in";
  cinematic?: boolean;
}

/**
 * Scroll-driven Liquid Glass Section Container (`AppleScrollBox`)
 * - Optically clear refractive Liquid Glass with zero delayed blur snap
 * - Fluid scroll glide + moving specular light reflection
 */
export const AppleScrollBox: React.FC<AppleScrollBoxProps> = ({
  children,
  className = "",
  mode = "unbox-in",
  cinematic = false,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || !boxRef.current) return;
    const useCinematic = cinematic && window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      if (useCinematic) {
        const stage = boxRef.current?.closest("section");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage ?? boxRef.current,
            start: "top top",
            end: "+=150%",
            pin: stage ?? boxRef.current,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
          },
        });

        timeline
          .fromTo(
            boxRef.current,
            {
              scale: 0.74,
              y: 180,
              rotateX: 12,
              opacity: 0.38,
              transformPerspective: 1400,
            },
            {
              scale: 1,
              y: 0,
              rotateX: 0,
              opacity: 1,
              ease: "power3.out",
              duration: 0.58,
            },
            0
          )
          .to(
            boxRef.current,
            {
              scale: 0.94,
              y: -72,
              rotateX: -4,
              opacity: 0.88,
              ease: "power2.inOut",
              duration: 0.42,
            },
            0.58
          );

        const content = boxRef.current.querySelector(":scope > .relative.z-10");
        if (content) {
          timeline.fromTo(
            Array.from(content.children),
            { y: 34, opacity: 0.65, scale: 0.985 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.06, ease: "power2.out", duration: 0.42 },
            0.14
          );
        }
      } else if (cinematic) {
        gsap.fromTo(
          boxRef.current,
          { scale: 0.84, y: 100, rotateX: 7, opacity: 0.52, transformPerspective: 1100 },
          {
            scale: 1,
            y: 0,
            rotateX: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: boxRef.current,
              start: "top 96%",
              end: "top 42%",
              scrub: true,
            },
          }
        );
      } else if (mode === "unbox-in") {
        gsap.fromTo(
          boxRef.current,
          {
            scale: 0.9,
            y: 84,
            rotateX: 5,
            opacity: 0.62,
            transformPerspective: 1200,
          },
          {
            scale: 1,
            y: 0,
            rotateX: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: boxRef.current,
              start: "top 92%",
              end: "top 42%",
              scrub: true,
            },
          }
        );

        const content = boxRef.current.querySelector(":scope > .relative.z-10");
        if (content) {
          gsap.fromTo(
            Array.from(content.children),
            { y: 26, opacity: 0.72, scale: 0.985 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.07,
              ease: "power2.out",
              scrollTrigger: {
                trigger: boxRef.current,
                start: "top 80%",
                end: "top 42%",
              scrub: true,
              },
            }
          );
        }
      } else {
        gsap.fromTo(
          boxRef.current,
          {
            scale: 1,
          },
          {
            scale: 0.94,
            ease: "none",
            scrollTrigger: {
              trigger: boxRef.current,
              start: "center center",
              end: "bottom top",
              scrub: 0.3,
            },
          }
        );
      }

      if (sheenRef.current) {
        gsap.fromTo(
          sheenRef.current,
          { yPercent: -35, xPercent: -6 },
          {
            yPercent: 45,
            xPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: boxRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: cinematic ? true : 0.3,
            },
          }
        );
      }
    }, boxRef);

    return () => ctx.revert();
  }, [mode, cinematic]);

  return (
    <div className={`w-full ${cinematic ? "lg:min-h-[72svh] lg:flex lg:items-center" : ""}`}>
      <div
        ref={boxRef}
        style={{
          backdropFilter: "blur(9px) saturate(155%) brightness(104%)",
          WebkitBackdropFilter: "blur(9px) saturate(155%) brightness(104%)",
        }}
        className={`${cinematic ? "lg:min-h-[68svh] lg:flex lg:flex-col lg:justify-center " : ""}relative rounded-[1.75rem] sm:rounded-[2.5rem] border border-white/[0.14] bg-gradient-to-br from-white/[0.055] via-[#10121A]/38 to-[#090A0F]/54 shadow-[0_32px_95px_-22px_rgba(0,0,0,0.82),inset_0_1.5px_2px_rgba(255,255,255,0.16)] overflow-hidden transform-gpu will-change-transform ${className}`}
      >
        {/* Liquid Glass Specular Sheen */}
        <div
          ref={sheenRef}
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-12 -top-24 h-64 z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255, 255, 255, 0.11) 0%, rgba(232, 106, 51, 0.055) 48%, transparent 80%)",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};
