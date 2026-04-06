import Navbar from "@/components/Navbar";
import HeroAnimation from "@/components/HeroAnimation";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import TechGrid from "@/components/TechGrid";
import SectionDivider from "@/components/SectionDivider";
import Pricing from "@/components/Pricing";
import Clients from "@/components/Clients";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <CursorFollower />
      <Navbar />
      <HeroAnimation />
      <Services />
      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider accent="#D4A053" variant="gradient" />
      </div>
      <Projects />
      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider accent="#E87461" variant="dots" />
      </div>
      <Clients />
      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider accent="#C9A96E" variant="gradient" />
      </div>
      <About />
      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider accent="#C9A96E" variant="line" />
      </div>
      <TechGrid />
      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider accent="#B5838D" variant="gradient" />
      </div>
      <Pricing />
      <div className="max-w-6xl mx-auto px-6">
        <SectionDivider accent="#D4A053" variant="line" />
      </div>
      <Contact />
      <Footer />
    </main>
  );
}
