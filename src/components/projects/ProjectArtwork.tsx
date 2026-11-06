import React from "react";
import { ProjectVisualTheme } from "@/data/portfolioData";

interface ProjectArtworkProps {
  theme: ProjectVisualTheme;
  number: string;
  accentHex: string;
  secondaryHex: string;
}

/**
 * Unique procedural technical cover artwork for each of the 9 projects.
 */
export const ProjectArtwork: React.FC<ProjectArtworkProps> = ({
  theme,
  accentHex,
  secondaryHex,
}) => {
  const renderUniqueArtwork = () => {
    switch (theme) {
      case "forensic-prism":
        // 01 — TriForge: Dual-plane image manipulation localization & frequency prism
        return (
          <svg viewBox="0 0 400 200" fill="none" className="w-full h-full">
            <defs>
              <linearGradient id="triforge-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={accentHex} stopOpacity="0.35" />
                <stop offset="100%" stopColor={secondaryHex} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Reference grid */}
            <rect x="28" y="24" width="140" height="152" rx="12" stroke="#B9C4D5" strokeOpacity="0.22" fill="#10141D" />
            <rect x="232" y="24" width="140" height="152" rx="12" stroke={accentHex} strokeOpacity="0.48" fill="#10141D" />
            {/* Localization region highlight */}
            <rect x="268" y="64" width="68" height="62" rx="8" fill="url(#triforge-grad)" stroke={accentHex} strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="302" cy="95" r="16" fill={accentHex} fillOpacity="0.22" stroke={accentHex} strokeWidth="1.4" />
            {/* Complementary visual channels bridge */}
            <path d="M168 65 C195 65, 205 80, 232 80" stroke={accentHex} strokeWidth="1.5" />
            <path d="M168 100 C195 100, 205 100, 232 100" stroke="#B9C4D5" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M168 135 C195 135, 205 120, 232 120" stroke={secondaryHex} strokeWidth="1.5" />
            {/* Scanning lines */}
            <line x1="44" y1="70" x2="152" y2="70" stroke="#B9C4D5" strokeOpacity="0.28" />
            <line x1="44" y1="100" x2="152" y2="100" stroke={accentHex} strokeOpacity="0.5" />
            <line x1="44" y1="130" x2="152" y2="130" stroke="#B9C4D5" strokeOpacity="0.28" />
            <polygon points="200,72 214,100 200,128 186,100" fill={accentHex} fillOpacity="0.25" stroke={accentHex} strokeWidth="1.4" />
          </svg>
        );

      case "botanical-xai":
        // 02 — Explainable Plant Disease Detection: Leaf venation + XAI attribution + RAG loop
        return (
          <svg viewBox="0 0 400 200" fill="none" className="w-full h-full">
            <path
              d="M75 145 C65 85, 115 40, 175 45 C175 105, 135 150, 75 145 Z"
              fill={accentHex}
              fillOpacity="0.14"
              stroke={accentHex}
              strokeWidth="1.75"
            />
            <path d="M75 145 Q125 95 175 45" stroke="#F4F6FA" strokeOpacity="0.6" strokeWidth="1.4" />
            <path d="M115 110 L95 85 M135 90 L118 66 M125 102 L152 108" stroke={accentHex} strokeOpacity="0.65" strokeWidth="1.2" />
            <circle cx="135" cy="86" r="18" fill={secondaryHex} fillOpacity="0.28" stroke={secondaryHex} strokeWidth="1.4" />
            <circle cx="135" cy="86" r="7" fill="#F4F6FA" fillOpacity="0.7" />
            <rect x="230" y="38" width="136" height="34" rx="8" fill="#10141D" stroke={accentHex} strokeOpacity="0.45" />
            <text x="244" y="59" fill="#F4F6FA" fontSize="10" fontFamily="IBM Plex Mono">XAI ATTRIBUTION</text>
            <rect x="230" y="84" width="136" height="34" rx="8" fill="#10141D" stroke={secondaryHex} strokeOpacity="0.45" />
            <text x="244" y="105" fill="#B9C4D5" fontSize="10" fontFamily="IBM Plex Mono">RAG + LLM CONTEXT</text>
            <rect x="230" y="130" width="136" height="34" rx="8" fill="#10141D" stroke="#B9C4D5" strokeOpacity="0.3" />
            <text x="244" y="151" fill="#AEB8C8" fontSize="10" fontFamily="IBM Plex Mono">HUMAN FEEDBACK LOOP</text>
            <path d="M178 86 L230 55 M178 86 L230 101 M178 86 L230 147" stroke={accentHex} strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="3 3" />
          </svg>
        );

      case "neural-shield":
        // 03 — AI Agentic IDS: Hexagonal security shield & deep packet flow inspection
        return (
          <svg viewBox="0 0 400 200" fill="none" className="w-full h-full">
            <polygon
              points="200,26 264,58 264,126 200,172 136,126 136,58"
              fill={accentHex}
              fillOpacity="0.12"
              stroke={accentHex}
              strokeWidth="1.75"
            />
            <polygon
              points="200,48 244,70 244,116 200,148 156,116 156,70"
              fill="#10141D"
              stroke="#B9C4D5"
              strokeOpacity="0.4"
              strokeWidth="1.2"
            />
            <line x1="28" y1="68" x2="136" y2="68" stroke={accentHex} strokeWidth="1.5" strokeDasharray="6 4" />
            <line x1="28" y1="100" x2="136" y2="100" stroke="#B9C4D5" strokeWidth="1.5" />
            <line x1="28" y1="132" x2="136" y2="132" stroke={accentHex} strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="264" y1="84" x2="372" y2="84" stroke="#B9C4D5" strokeWidth="1.5" />
            <line x1="264" y1="116" x2="372" y2="116" stroke={accentHex} strokeWidth="1.5" />
            <circle cx="200" cy="96" r="14" fill={accentHex} fillOpacity="0.3" stroke="#F4F6FA" strokeWidth="1.5" />
          </svg>
        );

      case "vision-grid":
        // 04 — ParkVision: Spatial occupancy matrix & ANPR bounding box frame
        return (
          <svg viewBox="0 0 400 200" fill="none" className="w-full h-full">
            {[0, 1, 2, 3].map((col) =>
              [0, 1].map((row) => {
                const x = 36 + col * 44;
                const y = 42 + row * 64;
                const active = (col + row) % 2 === 0;
                return (
                  <rect
                    key={`${col}-${row}`}
                    x={x}
                    y={y}
                    width="34"
                    height="50"
                    rx="6"
                    fill={active ? secondaryHex : "#10141D"}
                    fillOpacity={active ? "0.22" : "0.8"}
                    stroke={active ? secondaryHex : "#B9C4D5"}
                    strokeOpacity={active ? "0.8" : "0.25"}
                    strokeWidth="1.4"
                  />
                );
              })
            )}
            <rect x="232" y="48" width="134" height="104" rx="12" fill="#10141D" stroke="#B9C4D5" strokeOpacity="0.28" />
            <rect x="250" y="78" width="98" height="36" rx="6" fill={secondaryHex} fillOpacity="0.18" stroke={secondaryHex} strokeWidth="1.5" />
            <text x="263" y="100" fill="#F4F6FA" fontSize="11" fontFamily="IBM Plex Mono" letterSpacing="2">ANPR · OCR</text>
          </svg>
        );

      case "telemetry-wave":
        // 05 — Smart Irrigation System — AquaField: Sensor waveform & ESP32 node automation
        return (
          <svg viewBox="0 0 400 200" fill="none" className="w-full h-full">
            <path
              d="M24 130 C75 75, 115 155, 165 95 C215 35, 255 145, 305 85 C335 55, 355 95, 376 75"
              stroke={accentHex}
              strokeWidth="2.2"
              fill="none"
            />
            <path
              d="M24 148 C80 110, 130 165, 185 122 C240 80, 290 150, 376 112"
              stroke={secondaryHex}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
            />
            {[85, 165, 248, 305].map((cx, i) => (
              <g key={i}>
                <circle cx={cx} cy={i % 2 === 0 ? 108 : 92} r="6" fill="#10141D" stroke="#F4F6FA" strokeWidth="1.8" />
                <line x1={cx} y1={i % 2 === 0 ? 114 : 98} x2={cx} y2="168" stroke="#B9C4D5" strokeOpacity="0.22" />
              </g>
            ))}
          </svg>
        );

      case "knowledge-constellation":
        // 06 — Knowledge Graph NLP Suite: Directed entity-relation triple graph
        return (
          <svg viewBox="0 0 400 200" fill="none" className="w-full h-full">
            <line x1="92" y1="64" x2="196" y2="48" stroke={accentHex} strokeOpacity="0.6" strokeWidth="1.5" />
            <line x1="92" y1="64" x2="154" y2="138" stroke="#B9C4D5" strokeOpacity="0.4" strokeWidth="1.4" />
            <line x1="196" y1="48" x2="304" y2="76" stroke={accentHex} strokeOpacity="0.6" strokeWidth="1.5" />
            <line x1="196" y1="48" x2="246" y2="144" stroke={secondaryHex} strokeOpacity="0.5" strokeWidth="1.4" />
            <line x1="154" y1="138" x2="246" y2="144" stroke="#B9C4D5" strokeOpacity="0.45" strokeWidth="1.4" />
            <line x1="304" y1="76" x2="246" y2="144" stroke={accentHex} strokeOpacity="0.6" strokeWidth="1.5" />
            {[
              { x: 92, y: 64, r: 16, label: "E1" },
              { x: 196, y: 48, r: 20, label: "NLP" },
              { x: 154, y: 138, r: 15, label: "E2" },
              { x: 246, y: 144, r: 17, label: "KG" },
              { x: 304, y: 76, r: 16, label: "E3" },
            ].map((node, i) => (
              <g key={i}>
                <circle cx={node.x} cy={node.y} r={node.r} fill="#10141D" stroke={i % 2 === 0 ? accentHex : "#B9C4D5"} strokeWidth="1.75" />
                <text x={node.x - 9} y={node.y + 4} fill="#F4F6FA" fontSize="9.5" fontFamily="IBM Plex Mono">
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case "geospatial-atlas":
        // 07 — PadharooGo: Topographic map contours & location pins
        return (
          <svg viewBox="0 0 400 200" fill="none" className="w-full h-full">
            <ellipse cx="200" cy="110" rx="145" ry="58" stroke="#B9C4D5" strokeOpacity="0.2" strokeWidth="1.2" />
            <ellipse cx="200" cy="110" rx="102" ry="40" stroke={secondaryHex} strokeOpacity="0.35" strokeWidth="1.4" strokeDasharray="5 4" />
            <ellipse cx="200" cy="110" rx="58" ry="22" stroke={accentHex} strokeOpacity="0.5" strokeWidth="1.4" />
            {[
              { x: 142, y: 88 },
              { x: 215, y: 72 },
              { x: 268, y: 104 },
            ].map((pin, idx) => (
              <g key={idx}>
                <circle cx={pin.x} cy={pin.y} r="8" fill={secondaryHex} fillOpacity="0.3" stroke="#F4F6FA" strokeWidth="1.5" />
                <circle cx={pin.x} cy={pin.y} r="2.5" fill="#F4F6FA" />
              </g>
            ))}
          </svg>
        );

      case "cipher-lattice":
        // 08 — SecureSign: RSA public/private key lattice & SHA integrity seal
        return (
          <svg viewBox="0 0 400 200" fill="none" className="w-full h-full">
            <rect x="44" y="48" width="96" height="104" rx="10" fill="#10141D" stroke="#B9C4D5" strokeOpacity="0.35" />
            <line x1="62" y1="74" x2="122" y2="74" stroke="#B9C4D5" strokeWidth="1.5" />
            <line x1="62" y1="96" x2="122" y2="96" stroke={accentHex} strokeWidth="1.5" />
            <line x1="62" y1="118" x2="104" y2="118" stroke="#B9C4D5" strokeWidth="1.5" />
            <circle cx="204" cy="100" r="34" fill={accentHex} fillOpacity="0.14" stroke={accentHex} strokeWidth="1.75" />
            <polygon points="204,76 225,112 183,112" stroke="#F4F6FA" strokeWidth="1.5" fill="none" />
            <rect x="268" y="64" width="92" height="72" rx="10" fill="#10141D" stroke={accentHex} strokeOpacity="0.6" />
            <text x="284" y="104" fill="#F4F6FA" fontSize="11" fontFamily="IBM Plex Mono">RSA-VALID</text>
            <line x1="140" y1="100" x2="170" y2="100" stroke={accentHex} strokeWidth="1.5" />
            <line x1="238" y1="100" x2="268" y2="100" stroke={accentHex} strokeWidth="1.5" />
          </svg>
        );

      case "sonar-sweep":
        // 09 — Netra: 180-degree ultrasonic polar radar sweep
        return (
          <svg viewBox="0 0 400 200" fill="none" className="w-full h-full">
            <path d="M80 164 A120 120 0 0 1 320 164" stroke={accentHex} strokeOpacity="0.55" strokeWidth="1.6" />
            <path d="M115 164 A85 85 0 0 1 285 164" stroke="#B9C4D5" strokeOpacity="0.28" strokeWidth="1.2" strokeDasharray="4 4" />
            <path d="M150 164 A50 50 0 0 1 250 164" stroke={secondaryHex} strokeOpacity="0.45" strokeWidth="1.2" />
            <line x1="64" y1="164" x2="336" y2="164" stroke="#B9C4D5" strokeOpacity="0.35" strokeWidth="1.4" />
            <path d="M200 164 L278 72 A120 120 0 0 1 312 122 Z" fill={secondaryHex} fillOpacity="0.22" />
            <line x1="200" y1="164" x2="278" y2="72" stroke="#F4F6FA" strokeWidth="1.75" />
            <circle cx="262" cy="98" r="5" fill={accentHex} />
            <circle cx="152" cy="112" r="4" fill="#B9C4D5" />
          </svg>
        );
    }
  };

  return (
    <div className="relative w-full h-48 sm:h-56 rounded-2xl bg-[#141519]/85 border border-[#F5F3F0]/14 overflow-hidden group-hover:border-[#E86A33]/50 transition-all duration-500">
      <div className="absolute inset-0 grid-backdrop opacity-25" />
      <div
        className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentHex}28, transparent 70%)`,
        }}
      />

      {/* Artwork SVG with smooth hover scale and depth */}
      <div className="relative z-10 w-full h-full p-4 sm:p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
        {renderUniqueArtwork()}
      </div>
    </div>
  );
};
