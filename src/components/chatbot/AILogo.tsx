export function AILogo({ compact = false }: { compact?: boolean }) {
  return (
    <svg className={`ai-logo${compact ? " ai-logo-compact" : ""}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M18 12h28a8 8 0 0 1 8 8v15a8 8 0 0 1-8 8H30l-13 9v-9a8 8 0 0 1-7-8V20a8 8 0 0 1 8-8Z" stroke="#F5F3F0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m32 20 3.4 8.6L44 32l-8.6 3.4L32 44l-3.4-8.6L20 32l8.6-3.4L32 20Z" fill="#F29A4A" />
      <circle cx="45" cy="20" r="2.2" fill="#F29A4A" />
    </svg>
  );
}
