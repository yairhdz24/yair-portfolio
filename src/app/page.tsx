import Navbar from "@/components/Navbar";
import HeroAnimation from "@/components/HeroAnimation";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";
import TechGrid from "@/components/TechGrid";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <CursorFollower />
      <Navbar />
      <HeroAnimation />
      <Services />
      <Projects />
      <About />
      <TechGrid />
      <Contact />
      <Footer />
    </main>
  );
}
