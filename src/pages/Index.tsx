import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Skills from "@/components/Skills";
import CodingProfiles from "@/components/CodingProfiles";
import Projects from "@/components/Projects";
import Roadmap from "@/components/Roadmap";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <Profile />
      <Skills />
      <CodingProfiles />
      <Projects />
      <Roadmap />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
