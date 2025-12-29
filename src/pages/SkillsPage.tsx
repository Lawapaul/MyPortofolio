import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/use-page-title";

const SkillsPage = () => {
  usePageTitle({ 
    title: "Skills | Harshit Singh Shekhawat",
    favicon: "⚡"
  });

  return (
    <main className="relative overflow-hidden pt-20">
      <Navbar />
      <Skills />
      <Footer />
    </main>
  );
};

export default SkillsPage;
