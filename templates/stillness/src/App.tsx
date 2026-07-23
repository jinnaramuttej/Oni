import { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ClassCategories from './components/ClassCategories';
import MeditationPrograms from './components/MeditationPrograms';
import BreathworkSection from './components/BreathworkSection';
import Instructors from './components/Instructors';
import Schedule from './components/Schedule';
import Membership from './components/Membership';
import Retreats from './components/Retreats';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Faq from './components/Faq';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-ivory text-charcoal textured-bg">
      <Navbar scrolled={scrolled} />
      <Hero />
      <Philosophy />
      <ClassCategories />
      <MeditationPrograms />
      <BreathworkSection />
      <Instructors />
      <Schedule />
      <Membership />
      <Retreats />
      <Testimonials />
      <Gallery />
      <Faq />
      <Booking />
      <Contact />
      <Footer />
    </div>
  );
}
