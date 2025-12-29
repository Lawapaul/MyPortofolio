import Navbar from "@/components/Navbar";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/use-page-title";

const ResumePage = () => {
  usePageTitle({ 
    title: "Resume | Harshit Singh Shekhawat",
    favicon: "📄"
  });

  return (
    <main className="relative overflow-hidden pt-20">
      <Navbar />
      <Resume />
      <Footer />
    </main>
  );
};

export default ResumePage;
