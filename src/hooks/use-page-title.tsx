import { useEffect } from "react";

interface UsePageTitleOptions {
  title: string;
  favicon?: string;
}

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

    link.href = favicon ?? "/favicon.svg";

    // Cleanup: restore original title and favicon on unmount
    return () => {
      document.title = "Harshit Singh Shekhawat | AI/ML Engineer Portfolio";
      link.href = "/favicon.svg";
    };
  }, [title, favicon]);
};

