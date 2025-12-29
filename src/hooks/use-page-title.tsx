import { useEffect } from "react";

interface UsePageTitleOptions {
  title: string;
  favicon?: string;
}

// Helper function to create emoji-based favicon data URL using SVG
const createEmojiFavicon = (emoji: string): string => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <text y=".9em" font-size="90" text-anchor="middle">${emoji}</text>
    </svg>
  `.trim();
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const usePageTitle = ({ title, favicon }: UsePageTitleOptions) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create favicon link
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    if (favicon) {
      // If favicon is an emoji, convert it to data URL
      if (favicon.length <= 2 && /[\p{Emoji}]/u.test(favicon)) {
        link.href = createEmojiFavicon(favicon);
      } else {
        link.href = favicon;
      }
    }

    // Cleanup: restore original title and favicon on unmount
    return () => {
      document.title = "Harshit Singh Shekhawat | AI/ML Engineer Portfolio";
      link.href = "/favicon.ico";
    };
  }, [title, favicon]);
};

