import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { ArrowUp, Check, Copy, RotateCcw, Trash2, X } from "lucide-react";
import { AILogo } from "./AILogo";
import { MarkdownMessage } from "./MarkdownMessage";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  suggestions?: string[];
  failed?: boolean;
  retryText?: string;
};

type HistoryItem = {
  role: "user" | "model";
  text: string;
};

const greeting =
  "Hey there! 👋\n\nI'm Harshit's personal AI portfolio assistant.\n\nCurious about Harshit's research, deep learning projects (like TriForge and AI Agentic IDS), technical skills, or problem-solving journey?\n\nI can help you explore his work, compare project architectures, or answer technical questions.\n\nWhat would you like to know?";

const starters = [
  "What is Harshit's best project?",
  "Explain his AI Agentic IDS.",
  "What makes TriForge technically interesting?",
  "What are his strongest technical skills?",
  "Which project should an interviewer ask him about?",
  "How can recruiters contact him?"
];

const STORAGE_KEY = "ask-about-harshit-session-v2";

function initialMessages(): Message[] {
  return [{ id: "welcome", role: "assistant", text: greeting }];
}

function readSession(): { messages: Message[]; history: HistoryItem[] } {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.messages) && Array.isArray(parsed.history)) return parsed;
    }
  } catch {
    /* session storage can be unavailable in private browsing */
  }
  return { messages: initialMessages(), history: [] };
}

export default function ChatbotPanel({ onClose }: { onClose: () => void }) {
  const [session, setSession] = useState(readSession);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");
  const transcriptRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const requestRef = useRef<string | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    composerRef.current?.focus();
    return () => {
      document.body.style.overflow = oldOverflow;
      previousFocus.current?.focus();
    };
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      /* conversation remains in memory */
    }
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [session, busy]);

  const replaceSession = (next: { messages: Message[]; history: HistoryItem[] }) => setSession(next);

  const sendMessage = async (value: string, retryId?: string) => {
    const text = value.trim();
    if (!text || busy) return;
    const requestId = crypto.randomUUID();
    requestRef.current = requestId;
    setBusy(true);
    setError("");
    setDraft("");

    const pendingMessages = retryId
      ? session.messages.filter((message) => message.id !== retryId)
      : [...session.messages, { id: crypto.randomUUID(), role: "user" as const, text }];

    const baseHistory = session.history;
    setSession({ messages: pendingMessages, history: baseHistory });

    try {
      const response = await fetch("/.netlify/functions/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: baseHistory.slice(-8) }),
      });

      const rawResponse = await response.text();
      let payload: { message?: string; answer?: string; suggestions?: string[] };
      try {
        payload = JSON.parse(rawResponse);
      } catch {
        const isHtmlFallback =
          response.headers.get("content-type")?.includes("text/html") ||
          rawResponse.trim().startsWith("<!DOCTYPE html");
        throw new Error(
          isHtmlFallback || !rawResponse.trim()
            ? 'The chat function is not running in this preview. Start the app with `npm run dev`.'
            : "The chat service returned an unreadable response. Please try again in a moment."
        );
      }

      if (!response.ok) {
        throw new Error(payload.message || "The assistant is temporarily unavailable.");
      }

      if (typeof payload.answer !== "string" || !payload.answer.trim()) {
        throw new Error("The assistant returned an empty reply. Please try again.");
      }

      if (requestRef.current !== requestId) return;

      const answer: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: payload.answer,
        suggestions: Array.isArray(payload.suggestions) ? payload.suggestions : []
      };

      const nextHistory: HistoryItem[] = [
        ...baseHistory,
        { role: "user" as const, text },
        { role: "model" as const, text: payload.answer }
      ].slice(-8);

      setSession({ messages: [...pendingMessages, answer], history: nextHistory });
    } catch (cause) {
      if (requestRef.current !== requestId) return;
      const failureMessage =
        cause instanceof Error ? cause.message : "I couldn't complete that response. Please try again.";
      setError(failureMessage);
      setSession({
        messages: [
          ...pendingMessages,
          {
            id: `failed-${Date.now()}`,
            role: "assistant",
            text: failureMessage,
            failed: true,
            retryText: text
          }
        ],
        history: baseHistory
      });
    } finally {
      if (requestRef.current === requestId) setBusy(false);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendMessage(draft);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(draft);
    }
  };

  const newConversation = () => {
    requestRef.current = null;
    setBusy(false);
    setError("");
    setDraft("");
    replaceSession({ messages: initialMessages(), history: [] });
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const copyMessage = async (message: Message) => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(message.id);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setError("Copy is unavailable in this browser.");
    }
  };

  const trapFocus = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]), textarea:not([disabled]), a[href]'
      )
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <section
      className="ask-chat-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ask-chat-title"
      aria-describedby="ask-chat-subtitle"
      onKeyDown={trapFocus}
    >
      <header className="ask-chat-header">
        <div className="ask-chat-avatar">
          <AILogo compact />
        </div>
        <div className="ask-chat-brand">
          <h2 id="ask-chat-title">Ask About Harshit</h2>
          <p id="ask-chat-subtitle">
            <span className="ask-chat-ai-dot" aria-hidden="true" />
            Powered by OpenRouter
          </p>
        </div>
        <div className="ask-chat-header-actions">
          <button onClick={newConversation} aria-label="Start a new conversation" title="New conversation">
            <RotateCcw size={17} />
          </button>
          <button onClick={onClose} aria-label="Close chat">
            <X size={19} />
          </button>
        </div>
      </header>

      <div className="ask-chat-transcript" ref={transcriptRef} aria-live="polite" aria-relevant="additions text">
        {session.messages.map((message) => (
          <article
            key={message.id}
            className={`ask-chat-message ${message.role === "user" ? "from-user" : "from-assistant"}`}
          >
            <div className="ask-chat-bubble">
              <MarkdownMessage content={message.text} />
            </div>

            {message.role === "assistant" && message.id !== "welcome" && (
              <div className="ask-chat-message-tools">
                <button onClick={() => void copyMessage(message)} aria-label="Copy response">
                  {copied === message.id ? <Check size={14} /> : <Copy size={14} />}
                  {copied === message.id ? "Copied" : "Copy"}
                </button>
                {message.failed && (
                  <button
                    onClick={() => void sendMessage(message.retryText || "", message.id)}
                    aria-label="Retry response"
                  >
                    <RotateCcw size={14} />
                    Retry
                  </button>
                )}
              </div>
            )}

            {message.role === "assistant" && message.suggestions && message.suggestions.length > 0 && (
              <div className="ask-chat-suggestions" aria-label="Suggested questions">
                {message.suggestions.slice(0, 3).map((suggestion) => (
                  <button key={suggestion} disabled={busy} onClick={() => void sendMessage(suggestion)}>
                    {suggestion}
                    <ArrowUp size={12} />
                  </button>
                ))}
              </div>
            )}
          </article>
        ))}

        {session.messages.length === 1 && (
          <div className="ask-chat-starters" aria-label="Suggested questions">
            {starters.map((question) => (
              <button key={question} onClick={() => void sendMessage(question)} disabled={busy}>
                {question}
                <ArrowUp size={13} />
              </button>
            ))}
          </div>
        )}

        {busy && (
          <div className="ask-chat-typing" role="status" aria-label="Assistant is thinking">
            <span />
            <span />
            <span />
            <small>Thinking</small>
          </div>
        )}

        {error && (
          <p className="ask-chat-error" role="alert">
            {error}
          </p>
        )}
      </div>

      <form className="ask-chat-composer" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="ask-chat-input">
          Your message
        </label>
        <textarea
          id="ask-chat-input"
          ref={composerRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value.slice(0, 1400))}
          onKeyDown={onKeyDown}
          placeholder="Ask about Harshit's projects, skills, research…"
          rows={1}
          maxLength={1400}
          disabled={busy}
        />
        <button
          className="ask-chat-send"
          type="submit"
          disabled={busy || !draft.trim()}
          aria-label="Send message"
        >
          <ArrowUp size={19} />
        </button>
        <div className="ask-chat-composer-meta">
          <span>Shift + Enter for a new line</span>
          <button type="button" onClick={newConversation}>
            <Trash2 size={13} />
            Clear chat
          </button>
        </div>
      </form>
    </section>
  );
}
