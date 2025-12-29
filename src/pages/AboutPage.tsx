import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/use-page-title";

const AboutPage = () => {
  usePageTitle({ 
    title: "About | Harshit Singh Shekhawat",
    favicon: "👨‍💻"
  });

  return (
    <main className="relative overflow-hidden pt-20">
      <Navbar />
      <Profile />
      <Footer />
    </main>
  );
};

export default AboutPage;
