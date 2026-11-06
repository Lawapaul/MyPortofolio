import React from "react";
import { ExternalLink } from "lucide-react";
import { verifiedLinks } from "@/data/chatbot/verified-links";

// Normalize map for verified links
const safeLinks = new Map<string, string>();
for (const [label, url] of verifiedLinks) {
  safeLinks.set(url.trim().toLowerCase(), label);
  // Also map without trailing slash
  safeLinks.set(url.trim().replace(/\/$/, "").toLowerCase(), label);
}

function renderInline(text: string): React.ReactNode[] {
  // Regex to tokenize inline markdown and URLs
  // Matches: code `...`, bold **...**, italic *...*, markdown link [label](url), raw URL/email, or plain text
  const tokenRegex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s<>)"]+|mailto:[^\s<>)"]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\/(?:projects|about|education|expertise|profiles|contact)\b)/g;

  const parts = text.split(tokenRegex);
  return parts.map((part, index) => {
    if (!part) return null;

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={index} className="ask-chat-inline-code">
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={index}>{renderInline(part.slice(2, -2))}</strong>;
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={index}>{renderInline(part.slice(1, -1))}</em>;
    }

    // Markdown link: [label](url)
    const mdLinkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (mdLinkMatch) {
      const [, label, href] = mdLinkMatch;
      const isExternal = href.startsWith("http://") || href.startsWith("https://");
      return (
        <a
          key={index}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
          className="ask-chat-link"
        >
          {label}
          {isExternal && <ExternalLink size={11} className="inline-block ml-1 opacity-70" />}
        </a>
      );
    }

    // Raw URL, email or internal route
    const isUrl = part.startsWith("http://") || part.startsWith("https://");
    const isMail = part.startsWith("mailto:") || (part.includes("@") && !part.includes(" "));
    const isRoute = part.startsWith("/") && ["/projects", "/about", "/education", "/expertise", "/profiles", "/contact"].includes(part);

    if (isUrl || isMail || isRoute) {
      const cleanUrl = part.replace(/[.,!?;:]+$/, "");
      const trailingPunctuation = part.slice(cleanUrl.length);
      const normalizedHref = isMail && !cleanUrl.startsWith("mailto:")
        ? `mailto:${cleanUrl}`
        : cleanUrl;

      const knownLabel = safeLinks.get(normalizedHref.toLowerCase()) || safeLinks.get(cleanUrl.toLowerCase());
      const displayLabel = knownLabel || cleanUrl;
      const isExternal = normalizedHref.startsWith("http");

      return (
        <React.Fragment key={index}>
          <a
            href={normalizedHref}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer noopener" : undefined}
            className="ask-chat-link"
          >
            {displayLabel}
            {isExternal && <ExternalLink size={11} className="inline-block ml-1 opacity-70" />}
          </a>
          {trailingPunctuation}
        </React.Fragment>
      );
    }

    // Plain text
    return <span key={index}>{part}</span>;
  });
}

export function MarkdownMessage({ content }: { content: string }) {
  if (!content) return null;

  // Split content into blocks based on code fences and lines
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;
  let codeBlock: { language: string; lines: string[] } | null = null;
  let tableRows: string[][] | null = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === "ul") {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="ask-chat-list ask-chat-ul">
          {currentList.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    } else {
      blocks.push(
        <ol key={`ol-${blocks.length}`} className="ask-chat-list ask-chat-ol">
          {currentList.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  const flushTable = () => {
    if (!tableRows || tableRows.length < 2) {
      tableRows = null;
      return;
    }
    const header = tableRows[0];
    const rows = tableRows.slice(1);
    blocks.push(
      <div key={`table-${blocks.length}`} className="ask-chat-table-wrapper">
        <table className="ask-chat-table">
          <thead>
            <tr>
              {header.map((col, idx) => (
                <th key={idx}>{renderInline(col.trim())}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx}>{renderInline(cell.trim())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks (```)
    if (line.trim().startsWith("```")) {
      flushList();
      flushTable();
      if (codeBlock) {
        // End of code block
        blocks.push(
          <pre key={`code-${blocks.length}`} className="ask-chat-pre">
            <code className={`ask-chat-code-block ${codeBlock.language ? `language-${codeBlock.language}` : ""}`}>
              {codeBlock.lines.join("\n")}
            </code>
          </pre>
        );
        codeBlock = null;
      } else {
        // Start of code block
        const lang = line.trim().slice(3).trim();
        codeBlock = { language: lang, lines: [] };
      }
      continue;
    }

    if (codeBlock) {
      codeBlock.lines.push(line);
      continue;
    }

    // Handle Table rows (| col1 | col2 |)
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      flushList();
      // Skip separator rows (|---|---|)
      if (line.includes("---")) {
        continue;
      }
      const cells = line
        .trim()
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());
      if (!tableRows) {
        tableRows = [cells];
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (tableRows) {
      flushTable();
    }

    // Empty line -> flush list and table
    if (!line.trim()) {
      flushList();
      flushTable();
      continue;
    }

    // Headings (### or ####)
    if (line.startsWith("#### ")) {
      flushList();
      blocks.push(
        <h4 key={`h4-${blocks.length}`} className="ask-chat-h4">
          {renderInline(line.slice(5))}
        </h4>
      );
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      blocks.push(
        <h3 key={`h3-${blocks.length}`} className="ask-chat-h3">
          {renderInline(line.slice(4))}
        </h3>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h3 key={`h2-${blocks.length}`} className="ask-chat-h3">
          {renderInline(line.slice(3))}
        </h3>
      );
      continue;
    }

    // Unordered lists (- or *)
    const ulMatch = line.match(/^[\s]*[-*]\s+(.*)$/);
    if (ulMatch) {
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [ulMatch[1]] };
      } else {
        currentList.items.push(ulMatch[1]);
      }
      continue;
    }

    // Ordered lists (1. or 2.)
    const olMatch = line.match(/^[\s]*\d+\.\s+(.*)$/);
    if (olMatch) {
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [olMatch[1]] };
      } else {
        currentList.items.push(olMatch[1]);
      }
      continue;
    }

    // Normal paragraph line
    flushList();
    blocks.push(
      <p key={`p-${blocks.length}`} className="ask-chat-paragraph">
        {renderInline(line)}
      </p>
    );
  }

  flushList();
  flushTable();
  if (codeBlock) {
    blocks.push(
      <pre key={`code-${blocks.length}`} className="ask-chat-pre">
        <code>{codeBlock.lines.join("\n")}</code>
      </pre>
    );
  }

  return <div className="ask-chat-markdown">{blocks}</div>;
}

