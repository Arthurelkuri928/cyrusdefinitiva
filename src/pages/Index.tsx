
import Navbar from "@/components/Navbar";
import SimpleHero from "@/components/SimpleHero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Integrations from "@/components/Integrations";
import Stats from "@/components/Stats";
import BenefitsSection from "@/components/BenefitsSection";
import ComparisonSection from "@/components/ComparisonSection";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Navbar />
      <SimpleHero />
      <Stats />
      <BenefitsSection />
      <Integrations />
      <Features />
      <ComparisonSection />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  );
};

export default Index;
