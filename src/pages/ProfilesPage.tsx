import Navbar from "@/components/Navbar";
import CodingProfiles from "@/components/CodingProfiles";
import Footer from "@/components/Footer";

const ProfilesPage = () => {
  return (
    <main className="relative overflow-hidden pt-20">
      <Navbar />
      <CodingProfiles />
      <Footer />
    </main>
  );
};

export default ProfilesPage;
