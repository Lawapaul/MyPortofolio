import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AILogo } from "./AILogo";

const ChatbotPanel = lazy(() => import("./ChatbotPanel"));

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        requestAnimationFrame(() => launcherRef.current?.focus());
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return (
    <div className="ask-chat-root">
      {open && <Suspense fallback={<div className="ask-chat-loading" role="status">Opening assistant…</div>}><ChatbotPanel onClose={() => { setOpen(false); requestAnimationFrame(() => launcherRef.current?.focus()); }} /></Suspense>}
      <button ref={launcherRef} className={`ask-chat-launcher${open ? " is-open" : ""}`} onClick={() => setOpen((value) => !value)} aria-label={open ? "Close Ask About Harshit" : "Open Ask me about Harshit"} aria-expanded={open} title="Ask me about Harshit">
        <AILogo />
        <span className="ask-chat-tooltip">Ask me about Harshit <span aria-hidden="true">✨</span></span>
      </button>
    </div>
  );
}
