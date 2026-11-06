import React, { useEffect, useRef } from "react";

/**
 * Animated Topographic Wave Canvas Background
 * Renders undulating glowing contour wave ribbons that move at a medium pace,
 * perfectly matching the user's reference design with radiant orange/amber crests
 * and deep obsidian atmospheric background.
 */
export const CinematicBackdrop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Number of contour wave lines
    const LINE_COUNT = 32;
    // Highlight lines that have the vivid glowing amber/orange laser crests
    const HIGHLIGHT_INDICES = new Set([4, 9, 15, 22, 28]);

    let time = 0;
    // Keep the contour drift slow and calm, matching the earlier background motion.
    const SPEED = prefersReducedMotion ? 0.0015 : 0.006;

    const render = () => {
      time += SPEED;

      // 1. Base dark obsidian/near-black background
      ctx.fillStyle = "#090A0E";
      ctx.fillRect(0, 0, width, height);

      // 2. Atmospheric ambient glows matching the screenshot
      // Top-left warm amber aura
      const radialGlowLeft = ctx.createRadialGradient(
        width * 0.12,
        height * 0.18,
        0,
        width * 0.12,
        height * 0.18,
        Math.max(width * 0.38, 360)
      );
      radialGlowLeft.addColorStop(0, "rgba(240, 105, 35, 0.22)");
      radialGlowLeft.addColorStop(0.45, "rgba(180, 70, 20, 0.08)");
      radialGlowLeft.addColorStop(1, "rgba(9, 10, 14, 0)");
      ctx.fillStyle = radialGlowLeft;
      ctx.fillRect(0, 0, width, height);

      // Center-right warm amber aura behind mascot
      const radialGlowRight = ctx.createRadialGradient(
        width * 0.82,
        height * 0.48,
        0,
        width * 0.82,
        height * 0.48,
        Math.max(width * 0.42, 400)
      );
      radialGlowRight.addColorStop(0, "rgba(255, 125, 45, 0.18)");
      radialGlowRight.addColorStop(0.5, "rgba(190, 75, 20, 0.06)");
      radialGlowRight.addColorStop(1, "rgba(9, 10, 14, 0)");
      ctx.fillStyle = radialGlowRight;
      ctx.fillRect(0, 0, width, height);

      // 3. Render animated contour wave ribbons
      const steps = Math.min(Math.max(Math.floor(width / 32), 32), 70);

      // Horizontal gradient for highlight wave lines
      const highlightGradient = ctx.createLinearGradient(0, 0, width, 0);
      highlightGradient.addColorStop(0, "rgba(255, 110, 25, 0.10)");
      highlightGradient.addColorStop(0.18, "rgba(255, 175, 70, 0.26)"); // muted left crest
      highlightGradient.addColorStop(0.48, "rgba(235, 100, 35, 0.16)"); // mid dip
      highlightGradient.addColorStop(0.82, "rgba(255, 185, 80, 0.26)"); // muted right crest
      highlightGradient.addColorStop(1, "rgba(255, 120, 30, 0.12)");

      for (let i = 0; i < LINE_COUNT; i++) {
        const normI = i / (LINE_COUNT - 1); // 0 to 1
        const isHighlight = HIGHLIGHT_INDICES.has(i);

        // Base elevation with gentle curvature
        const baseY =
          height * 0.05 +
          normI * height * 0.9 +
          Math.sin(normI * Math.PI) * (height * 0.05);

        // Dynamic wave amplitudes
        const amp1 = 38 + Math.sin(normI * 3.2) * 24;
        const amp2 = 26 + Math.cos(normI * 2.6) * 18;
        const amp3 = 16 + Math.sin(normI * 4.4 + 1.2) * 12;

        ctx.beginPath();

        let prevX = 0;
        let prevY = 0;

        for (let s = 0; s <= steps; s++) {
          const normX = s / steps;
          const x = normX * width;

          // Undulating harmonics moving at medium pace
          const wave =
            Math.sin(normX * 3.6 + time * 1.15 + normI * 2.2) * amp1 +
            Math.cos(normX * 2.2 - time * 0.9 + normI * 2.8) * amp2 +
            Math.sin(normX * 5.2 + time * 0.65 + normI * 1.6) * amp3;

          // Gentle diagonal flow tilt from top-left curving toward bottom-right
          const tilt = (normX - 0.45) * (height * 0.2) * (1 - normI * 0.3);

          const y = baseY + wave + tilt;

          if (s === 0) {
            ctx.moveTo(x, y);
            prevX = x;
            prevY = y;
          } else {
            // Smooth quadratic curve interpolation
            const midX = (prevX + x) / 2;
            const midY = (prevY + y) / 2;
            ctx.quadraticCurveTo(prevX, prevY, midX, midY);
            prevX = x;
            prevY = y;
          }
        }
        ctx.lineTo(width, prevY);

        if (isHighlight) {
          // Vivid luminous crest lines matching reference image
          ctx.save();
          ctx.shadowColor = "rgba(255, 135, 45, 0.22)";
          ctx.shadowBlur = 9;
          ctx.strokeStyle = highlightGradient;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Hot luminous center pass
          ctx.shadowBlur = 2;
          ctx.strokeStyle = "rgba(255, 235, 195, 0.24)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        } else {
          // Subtle, elegant background topographic contour line
          const alpha = 0.025 + Math.sin(normI * Math.PI) * 0.055;
          ctx.strokeStyle = `rgba(230, 110, 48, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }

      // 4. Subtle edge vignette to frame content and deepen card contrast
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.38,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      vignette.addColorStop(0, "rgba(9, 10, 14, 0)");
      vignette.addColorStop(0.72, "rgba(8, 9, 13, 0.38)");
      vignette.addColorStop(1, "rgba(5, 6, 8, 0.78)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none bg-[#090A0E]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
    </div>
  );
};
