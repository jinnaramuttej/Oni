import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Philosophy } from './components/Philosophy';
import { RegionalSpecialties } from './components/RegionalSpecialties';
import { SignatureDishes } from './components/SignatureDishes';
import { BreakfastAndCoffee } from './components/BreakfastAndCoffee';
import { BananaLeafMeals } from './components/BananaLeafMeals';
import { SpiceGallery } from './components/SpiceGallery';
import { Sweets } from './components/Sweets';
import { Catering } from './components/Catering';
import { Testimonials } from './components/Testimonials';
import { Reservation } from './components/Reservation';
import { Location } from './components/Location';
import { Footer } from './components/Footer';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-terracotta text-warm-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-terracotta-dark hover:scale-105 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      <main>
        <Hero />
        <Story />
        <Philosophy />
        <RegionalSpecialties />
        <SignatureDishes />
        <BreakfastAndCoffee />
        <BananaLeafMeals />
        <SpiceGallery />
        <Sweets />
        <Catering />
        <Testimonials />
        <Reservation />
        <Location />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
