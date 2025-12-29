import Navbar from "@/components/Navbar";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/use-page-title";

const RoadmapPage = () => {
  usePageTitle({ 
    title: "Roadmap | Harshit Singh Shekhawat",
    favicon: "🗺️"
  });

  return (
    <main className="relative overflow-hidden pt-20">
      <Navbar />
      <Roadmap />
      <Footer />
    </main>
  );
};

export default RoadmapPage;
