import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/use-page-title";

const ContactPage = () => {
  usePageTitle({ 
    title: "Contact | Harshit Singh Shekhawat",
    favicon: "📧"
  });

  return (
    <main className="relative overflow-hidden pt-20">
      <Navbar />
      <Contact />
      <Footer />
    </main>
  );
};

export default ContactPage;
