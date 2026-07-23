import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Overview from "./components/Overview";
import Services from "./components/Services";
import Expertise from "./components/Expertise";
import Industries from "./components/Industries";
import Experts from "./components/Experts";
import Testimonials from "./components/Testimonials";
import Insights from "./components/Insights";
import Consultation from "./components/Consultation";
import Footer from "./components/Footer";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-2xl bg-navy-800 text-white shadow-lift transition-all duration-500 hover:-translate-y-1 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-700 antialiased">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-navy-800 shadow-lift transition-transform duration-300 focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Overview />
        <Services />
        <Expertise />
        <Industries />
        <Experts />
        <Testimonials />
        <Insights />
        <Consultation />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
