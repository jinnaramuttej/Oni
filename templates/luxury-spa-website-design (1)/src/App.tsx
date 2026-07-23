import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import WellnessRituals from './components/WellnessRituals';
import Therapists from './components/Therapists';
import Testimonials from './components/Testimonials';
import Products from './components/Products';
import Memberships from './components/Memberships';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // Add smooth scroll for all anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          const offset = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-charcoal antialiased">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <WellnessRituals />
        <Therapists />
        <Testimonials />
        <Products />
        <Memberships />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
