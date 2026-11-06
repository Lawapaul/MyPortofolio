import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface VideoChapter {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  accent: string;
  secondary: string;
}

const VIDEO_CHAPTERS: VideoChapter[] = [
  {
    id: "vision",
    title: "Neural Vision & Image Forensics",
    subtitle: "TriForge · Manipulation Localization Pipeline",
    caption:
      "Real-time frequency decomposition and pixel-level localization identifying manipulated image regions.",
    accent: "#E86A33",
    secondary: "#F29A4A",
  },
  {
    id: "xai",
    title: "Explainable Deep Learning & RAG",
    subtitle: "Attribution Maps · Human-in-the-Loop Feedback",
    caption:
      "Combining convolutional attribution heatmaps with retrieval-augmented LLM synthesis for transparent AI decisions.",
    accent: "#F29A4A",
    secondary: "#E86A33",
  },
  {
    id: "cyber",
    title: "Autonomous Cyber Defense",
    subtitle: "Agentic Intrusion Detection System",
    caption:
      "Deep packet stream inspection with explainable anomaly scoring and automated threat mitigation.",
    accent: "#E86A33",
    secondary: "#C8C2BC",
  },
  {
    id: "edge",
    title: "Embedded Edge & Sensor Fusion",
    subtitle: "Netra Radar & AquaField Telemetry",
    caption:
      "180° ultrasonic polar spatial mapping and real-time microcontroller sensor fusion at the hardware edge.",
    accent: "#C8C2BC",
    secondary: "#E86A33",
  },
];

/**
 * High-frame-rate procedural HTML5 Canvas video renderer.
 * Draws a continuous 60fps technical motion film in warm burnt-orange, amber & charcoal tones.
 */
const LiveCinemaCanvas: React.FC<{
  activeChapterIndex: number;
  isPlaying: boolean;
  compact?: boolean;
}> = ({ activeChapterIndex, isPlaying, compact = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let time = 0;

    const render = () => {
      if (isPlaying) {
        time += 0.022;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // Deep warm charcoal cinema background
      const bgGrad = ctx.createRadialGradient(
        w * 0.5,
        h * 0.42,
        10,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.75
      );
      bgGrad.addColorStop(0, "#241B19");
      bgGrad.addColorStop(0.55, "#151418");
      bgGrad.addColorStop(1, "#0E0F13");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle perspective horizon grid
      ctx.strokeStyle = "rgba(245, 243, 240, 0.05)";
      ctx.lineWidth = 1;
      const gridStep = compact ? 16 : 36;
      for (let x = 0; x < w; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const cx = w / 2;
      const cy = h * 0.42;

      if (activeChapterIndex === 0) {
        const numWaves = compact ? 2 : 4;
        for (let i = 0; i < numWaves; i++) {
          ctx.beginPath();
          ctx.strokeStyle =
            i % 2 === 0
              ? "rgba(232, 106, 51, 0.72)"
              : "rgba(242, 154, 74, 0.48)";
          ctx.lineWidth = compact ? 1.5 : 2.2;
          for (let x = 0; x <= w; x += 6) {
            const y =
              cy +
              Math.sin(x * 0.018 + time * 2.2 + i * 1.1) *
                (compact ? 10 : 30) *
                Math.sin(time * 0.7 + i);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        const scanX = cx + Math.sin(time * 1.4) * (w * 0.2);
        const boxSize = compact ? 22 : 84;
        ctx.strokeStyle = "#E86A33";
        ctx.lineWidth = compact ? 1.5 : 2;
        ctx.strokeRect(
          scanX - boxSize / 2,
          cy - boxSize / 2,
          boxSize,
          boxSize
        );

        const glow = ctx.createRadialGradient(
          scanX,
          cy,
          2,
          scanX,
          cy,
          boxSize * 0.85
        );
        glow.addColorStop(0, "rgba(232, 106, 51, 0.45)");
        glow.addColorStop(1, "rgba(232, 106, 51, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(scanX, cy, boxSize * 0.85, 0, Math.PI * 2);
        ctx.fill();
      } else if (activeChapterIndex === 1) {
        const nodes = compact ? 6 : 14;
        const points: Array<{ x: number; y: number }> = [];
        for (let i = 0; i < nodes; i++) {
          const angle = (i / nodes) * Math.PI * 2 + time * 0.45;
          const rad =
            (compact ? 14 : 68) + Math.sin(time * 1.8 + i * 0.9) * (compact ? 4 : 18);
          points.push({
            x: cx + Math.cos(angle) * rad * 1.3,
            y: cy + Math.sin(angle) * rad * 0.75,
          });
        }

        ctx.strokeStyle = "rgba(242, 154, 74, 0.36)";
        ctx.lineWidth = 1.3;
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            if ((i + j) % 3 === 0) {
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              ctx.stroke();
            }
          }
        }

        points.forEach((pt, idx) => {
          ctx.fillStyle = idx % 2 === 0 ? "#E86A33" : "#F29A4A";
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, compact ? 2.5 : 5, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (activeChapterIndex === 2) {
        const shieldR = compact ? 16 : 62;
        ctx.strokeStyle = "#E86A33";
        ctx.lineWidth = compact ? 1.5 : 2.5;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2 + time * 0.5;
          const px = cx + Math.cos(a) * shieldR;
          const py = cy + Math.sin(a) * shieldR;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.strokeStyle = "rgba(245, 243, 240, 0.65)";
        ctx.beginPath();
        ctx.arc(
          cx,
          cy,
          shieldR * (0.45 + Math.sin(time * 3) * 0.08),
          0,
          Math.PI * 2
        );
        ctx.stroke();
      } else {
        const radarR = compact ? 18 : 74;
        ctx.strokeStyle = "rgba(232, 106, 51, 0.45)";
        ctx.lineWidth = 1.6;
        [0.45, 0.75, 1].forEach((ratio) => {
          ctx.beginPath();
          ctx.arc(cx, cy, radarR * ratio, 0, Math.PI * 2);
          ctx.stroke();
        });

        const sweepAngle = time * 2.1;
        ctx.strokeStyle = "#F5F3F0";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
          cx + Math.cos(sweepAngle) * radarR,
          cy + Math.sin(sweepAngle) * radarR
        );
        ctx.stroke();
      }

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [activeChapterIndex, isPlaying, compact]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

/**
 * Full-Scale Interactive Cinema Video Showreel Stage
 * Strictly contained and responsive across iPhone, iPad, and Desktop.
 */
export const CinematicVideoShowreel: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((idx) => (idx + 1) % VIDEO_CHAPTERS.length);
          return 0;
        }
        return prev + 1.25;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentChapter = VIDEO_CHAPTERS[activeIdx];

  return (
    <div className="relative w-full max-w-full rounded-[1.75rem] sm:rounded-[2.5rem] surface-metallic border border-[#E86A33]/25 p-3 sm:p-6 lg:p-8 shadow-[0_40px_110px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
      {/* Cinema Display Screen */}
      <div className="relative w-full min-h-[420px] sm:min-h-[440px] lg:min-h-[480px] rounded-[1.35rem] sm:rounded-[2rem] overflow-hidden border border-[#F5F3F0]/14 bg-[#0E0F13] flex flex-col justify-between">
        {/* Background Canvas Layer */}
        <div className="absolute inset-0">
          <LiveCinemaCanvas
            activeChapterIndex={activeIdx}
            isPlaying={isPlaying}
          />
        </div>

        {/* Top Video Status Overlay */}
        <div className="relative z-10 p-3.5 sm:p-5 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#141519]/85 backdrop-blur-xl border border-[#E86A33]/35">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isPlaying ? "bg-[#E86A33] animate-pulse" : "bg-[#C8C2BC]"
              }`}
            />
            <span className="text-xs sm:text-[13px] font-bold tracking-tight text-[#F5F3F0]">
              {isPlaying ? "SYSTEM REEL · 60 FPS" : "PAUSED"}
            </span>
          </div>

          <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#141519]/85 backdrop-blur-xl border border-[#F5F3F0]/14 text-xs sm:text-[13px] font-semibold text-[#C8C2BC] truncate max-w-full">
            {currentChapter.subtitle}
          </div>
        </div>

        {/* Bottom Cinema Caption & Scrubber Overlay */}
        <div className="relative z-10 mt-28 sm:mt-36 p-4 sm:p-7 lg:p-8 bg-gradient-to-t from-[#0E0F13] via-[#0E0F13]/90 to-transparent flex flex-col justify-end gap-4 sm:gap-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl min-w-0">
              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F5F3F0] tracking-tight">
                {currentChapter.title}
              </h3>
              <p className="text-sm sm:text-base text-[#C4BFB9] leading-relaxed text-justify">
                {currentChapter.caption}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? "Pause video reel" : "Play video reel"}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#E86A33] hover:bg-[#F29A4A] text-[#121316] font-heading font-bold text-xs sm:text-[14px] transition-all shrink-0 self-start sm:self-auto shadow-[0_10px_28px_-8px_rgba(232,106,51,0.65)]"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  <span>Pause Reel</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  <span>Play Reel</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Chapter Scrubber Bar */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 pt-1">
            {VIDEO_CHAPTERS.map((chap, idx) => {
              const isCurrent = idx === activeIdx;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => {
                    setActiveIdx(idx);
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className={`text-left p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all min-w-0 ${
                    isCurrent
                      ? "bg-[#1F1D21]/95 border-[#E86A33]/75 shadow-[0_0_20px_rgba(232,106,51,0.2)]"
                      : "bg-[#141519]/75 border-[#F5F3F0]/12 hover:border-[#E86A33]/40"
                  }`}
                >
                  <div className="text-xs sm:text-[13px] font-bold text-[#F5F3F0] truncate">
                    {chap.title}
                  </div>
                  <div className="mt-1.5 w-full h-1 rounded-full bg-[#0E0F13] overflow-hidden">
                    <div
                      className="h-full bg-[#E86A33] transition-all duration-100"
                      style={{
                        width: isCurrent
                          ? `${progress}%`
                          : idx < activeIdx
                          ? "100%"
                          : "0%",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
