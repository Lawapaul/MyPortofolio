import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CinematicBackdrop } from "@/components/common/CinematicBackdrop";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
