import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Dishes from "./components/Dishes";
import TastingMenu from "./components/TastingMenu";
import Wine from "./components/Wine";
import Atmosphere from "./components/Atmosphere";
import Recognition from "./components/Recognition";
import Testimonials from "./components/Testimonials";
import Reservation from "./components/Reservation";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-charcoal text-ivory">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Dishes />
        <TastingMenu />
        <Wine />
        <Atmosphere />
        <Recognition />
        <Testimonials />
        <Reservation />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
