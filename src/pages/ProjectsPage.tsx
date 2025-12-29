import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const ProjectsPage = () => {
  return (
    <main className="relative overflow-hidden pt-20">
      <Navbar />
      <Projects />
      <Footer />
    </main>
  );
};

export default ProjectsPage;
