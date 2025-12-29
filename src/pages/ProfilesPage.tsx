import Navbar from "@/components/Navbar";
import CodingProfiles from "@/components/CodingProfiles";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/use-page-title";

const ProfilesPage = () => {
  usePageTitle({ 
    title: "Coding Profiles | Harshit Singh Shekhawat",
    favicon: "💻"
  });

  return (
    <main className="relative overflow-hidden pt-20">
      <Navbar />
      <CodingProfiles />
      <Footer />
    </main>
  );
};

export default ProfilesPage;
