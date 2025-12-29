import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/use-page-title";

const ProjectsPage = () => {
  usePageTitle({ 
    title: "Projects | Harshit Singh Shekhawat",
    favicon: "🚀"
  });

  return (
    <main className="relative overflow-hidden pt-20">
      <Navbar />
      <Projects />
      <Footer />
    </main>
  );
};

export default ProjectsPage;
