import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;
}

/**
 * Minimal, 60 FPS Live Ambient Background Canvas
 * Replaces the static solid background with slowly drifting neural constellation nodes,
 * soft aurora light waves, and subtle pointer-reactive depth.
 */
export const MinimalLiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const pointer = { x: width * 0.5, y: height * 0.35 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const count = Math.min(42, Math.max(22, Math.floor(width / 38)));
    const colors = ["#728BFF", "#B9C4D5", "#A78BFA"];
    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: 1.1 + (i % 3) * 0.55,
      alpha: 0.22 + (i % 4) * 0.1,
      color: colors[i % colors.length],
    }));

    let t = 0;

    const render = () => {
      t += 0.008;

      // Deep midnight base
      ctx.fillStyle = "#0B0E16";
      ctx.fillRect(0, 0, width, height);

      // Slowly breathing minimal aurora orbs
      const orb1X = width * (0.28 + Math.sin(t * 0.7) * 0.12);
      const orb1Y = height * (0.25 + Math.cos(t * 0.5) * 0.1);
      const g1 = ctx.createRadialGradient(
        orb1X,
        orb1Y,
        10,
        orb1X,
        orb1Y,
        Math.max(width, height) * 0.45
      );
      g1.addColorStop(0, "rgba(114, 139, 255, 0.085)");
      g1.addColorStop(0.5, "rgba(32, 38, 51, 0.04)");
      g1.addColorStop(1, "rgba(11, 14, 22, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const orb2X = width * (0.74 + Math.cos(t * 0.6) * 0.1);
      const orb2Y = height * (0.68 + Math.sin(t * 0.8) * 0.1);
      const g2 = ctx.createRadialGradient(
        orb2X,
        orb2Y,
        10,
        orb2X,
        orb2Y,
        Math.max(width, height) * 0.42
      );
      g2.addColorStop(0, "rgba(167, 139, 250, 0.065)");
      g2.addColorStop(1, "rgba(11, 14, 22, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Update & draw minimal drifting nodes and delicate filaments
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Connect nearby nodes with ultra-minimal hairlines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 19000) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / 138) * 0.11;
            ctx.strokeStyle = `rgba(185, 196, 213, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        // Subtle connection to pointer when close
        const pdx = p.x - pointer.x;
        const pdy = p.y - pointer.y;
        const pDistSq = pdx * pdx + pdy * pdy;
        if (pDistSq < 28000) {
          const pDist = Math.sqrt(pDistSq);
          const pAlpha = (1 - pDist / 167) * 0.18;
          ctx.strokeStyle = `rgba(114, 139, 255, ${pAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }

        // Draw particle dot
        ctx.globalAlpha = p.alpha + Math.sin(t * 2 + i) * 0.08;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none"
    />
  );
};

