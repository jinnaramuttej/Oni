import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { Achievements } from "./components/Achievements";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main-content">
        <Hero />
        <LogoStrip />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Services />
        <Testimonials />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
