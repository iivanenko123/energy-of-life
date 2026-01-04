import SpaceBackground from "@/components/SpaceBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import EnergyDescription from "@/components/EnergyDescription";
import ForWhomSection from "@/components/ForWhomSection";
import ProgramSection from "@/components/ProgramSection";
import AuthorSection from "@/components/AuthorSection";
import TelegramCTA from "@/components/TelegramCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SpaceBackground />
      <Header />
      <main>
        <HeroSection />
        <EnergyDescription />
        <ForWhomSection />
        <ProgramSection />
        <AuthorSection />
        <TelegramCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
