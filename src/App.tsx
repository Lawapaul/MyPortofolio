import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CinematicBackdrop } from "@/components/common/CinematicBackdrop";
import { SiteIntroGate } from "@/components/common/SiteIntroGate";
import { startBackgroundMusic } from "@/components/common/BackgroundMusicPlayer";
import { NavbarV2 } from "@/components/navigation/NavbarV2";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import ProfilesPage from "./pages/ProfilesPage";
import RoadmapPage from "./pages/RoadmapPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PortfolioExperience: React.FC = () => {
  const [introReady, setIntroReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const enteredRef = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroReady(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (contentRef.current) contentRef.current.inert = !entered;
  }, [entered]);

  const handleEnter = useCallback(() => {
    if (!introReady || enteredRef.current) return;
    enteredRef.current = true;
    void startBackgroundMusic();
    setEntered(true);
  }, [introReady]);

  return (
    <>
      <motion.div
        ref={contentRef}
        aria-hidden={!entered}
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.95,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ pointerEvents: entered ? "auto" : "none" }}
        className="min-h-screen"
      >
        {/* Persistent Cinematic "Above the Clouds" Live Video Environment */}
        <CinematicBackdrop />
        {/* Persistent Sculpted Expanding Navigation Bar */}
        <NavbarV2 />
        <ChatbotWidget />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/expertise" element={<SkillsPage />} />
          <Route path="/skills" element={<Navigate to="/expertise" replace />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/education" element={<RoadmapPage />} />
          <Route path="/roadmap" element={<Navigate to="/education" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resume" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>

      <AnimatePresence>
        {!entered && (
          <SiteIntroGate
            key="site-intro"
            ready={introReady}
            onEnter={handleEnter}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PortfolioExperience />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
