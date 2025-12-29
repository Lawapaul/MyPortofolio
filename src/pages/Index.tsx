import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/use-page-title";

const Index = () => {
  usePageTitle({ 
    title: "Harshit Singh Shekhawat | AI/ML Engineer Portfolio",
    favicon: "🤖"
  });

  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <Profile />
      <Footer />
    </main>
  );
};

export default Index;
