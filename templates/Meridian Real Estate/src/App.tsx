import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Featured from "./components/Featured";
import { Collections, CityTicker } from "./components/Collections";
import Neighborhoods from "./components/Neighborhoods";
import Agents from "./components/Agents";
import Sold from "./components/Sold";
import Testimonials from "./components/Testimonials";
import Insights from "./components/Insights";
import Guides from "./components/Guides";
import Consultation from "./components/Consultation";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <div aria-hidden className="noise" />
      <Nav />
      <main>
        <Hero />
        <Featured />
        <Collections />
        <CityTicker />
        <Neighborhoods />
        <Agents />
        <Sold />
        <Testimonials />
        <Insights />
        <Guides />
        <Consultation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
